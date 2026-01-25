-- Supabase Schema for Receipt Processing and Donations
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create donations table with receipt processing fields
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Basic donation information
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    transaction_id VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending_verification',
    
    -- Receipt processing fields
    receipt_image_url TEXT,
    receipt_processing_status VARCHAR(50) DEFAULT 'not_processed',
    receipt_parsed_data JSONB,
    receipt_confidence DECIMAL(3,2),
    receipt_processing_notes TEXT,
    
    -- UPI specific extracted data
    sender_name VARCHAR(255),
    sender_phone VARCHAR(50),
    from_account VARCHAR(255),
    from_upi_id VARCHAR(255),
    recipient_name VARCHAR(255),
    to_upi_id VARCHAR(255),
    payment_status VARCHAR(50),
    payment_date_time VARCHAR(100),
    payment_method VARCHAR(50),
    
    -- Metadata
    ai_model_used VARCHAR(50) DEFAULT 'anthropic/claude-3.5-sonnet',
    processing_time_ms INTEGER,
    ip_address INET,
    user_agent TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON public.donations(created_at);
CREATE INDEX IF NOT EXISTS idx_donations_status ON public.donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_receipt_status ON public.donations(receipt_processing_status);
CREATE INDEX IF NOT EXISTS idx_donations_email ON public.donations(email);
CREATE INDEX IF NOT EXISTS idx_donations_transaction_id ON public.donations(transaction_id);
CREATE INDEX IF NOT EXISTS idx_donations_amount ON public.donations(amount);

-- Create a view for donation statistics
CREATE OR REPLACE VIEW public.donation_stats AS
SELECT 
    COUNT(*) as total_donations,
    SUM(amount) as total_amount,
    AVG(amount) as average_amount,
    COUNT(CASE WHEN receipt_processing_status = 'completed' THEN 1 END) as receipts_processed,
    COUNT(CASE WHEN receipt_confidence >= 0.8 THEN 1 END) as high_confidence_receipts,
    COUNT(CASE WHEN status = 'verified' THEN 1 END) as verified_donations,
    COUNT(CASE WHEN status = 'pending_verification' THEN 1 END) as pending_donations
FROM public.donations;

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_donations_updated_at 
    BEFORE UPDATE ON public.donations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create a function to get recent donations with receipt data
CREATE OR REPLACE FUNCTION get_recent_donations(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
    id UUID,
    name VARCHAR(255),
    email VARCHAR(255),
    amount DECIMAL(10,2),
    transaction_id VARCHAR(255),
    status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE,
    receipt_processing_status VARCHAR(50),
    receipt_confidence DECIMAL(3,2),
    sender_name VARCHAR(255),
    recipient_name VARCHAR(255),
    payment_method VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        d.id,
        d.name,
        d.email,
        d.amount,
        d.transaction_id,
        d.status,
        d.created_at,
        d.receipt_processing_status,
        d.receipt_confidence,
        d.sender_name,
        d.recipient_name,
        d.payment_method
    FROM public.donations d
    ORDER BY d.created_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) policies
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to insert their own donations
CREATE POLICY "Users can insert their own donations" ON public.donations
    FOR INSERT WITH CHECK (true);

-- Policy to allow users to view their own donations
CREATE POLICY "Users can view their own donations" ON public.donations
    FOR SELECT USING (true);

-- Policy to allow admins to view all donations
CREATE POLICY "Admins can view all donations" ON public.donations
    FOR ALL USING (true);

-- Create a function to insert donation with receipt data
CREATE OR REPLACE FUNCTION insert_donation_with_receipt(
    p_name VARCHAR(255),
    p_email VARCHAR(255),
    p_amount DECIMAL(10,2),
    p_transaction_id VARCHAR(255),
    p_phone VARCHAR(50) DEFAULT NULL,
    p_message TEXT DEFAULT NULL,
    p_receipt_data JSONB DEFAULT NULL,
    p_receipt_confidence DECIMAL(3,2) DEFAULT NULL,
    p_processing_notes TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    donation_id UUID;
    receipt_status VARCHAR(50);
BEGIN
    -- Determine receipt processing status
    IF p_receipt_data IS NOT NULL THEN
        receipt_status := 'completed';
    ELSE
        receipt_status := 'not_processed';
    END IF;
    
    -- Insert the donation
    INSERT INTO public.donations (
        name,
        email,
        amount,
        transaction_id,
        phone,
        message,
        receipt_processing_status,
        receipt_parsed_data,
        receipt_confidence,
        receipt_processing_notes,
        sender_name,
        sender_phone,
        from_account,
        from_upi_id,
        recipient_name,
        to_upi_id,
        payment_status,
        payment_date_time,
        payment_method
    ) VALUES (
        p_name,
        p_email,
        p_amount,
        p_transaction_id,
        p_phone,
        p_message,
        receipt_status,
        p_receipt_data,
        p_receipt_confidence,
        p_processing_notes,
        (p_receipt_data->>'sender_name')::VARCHAR(255),
        (p_receipt_data->>'sender_phone')::VARCHAR(50),
        (p_receipt_data->>'from_account')::VARCHAR(255),
        (p_receipt_data->>'from_upi_id')::VARCHAR(255),
        (p_receipt_data->>'recipient_name')::VARCHAR(255),
        (p_receipt_data->>'to_upi_id')::VARCHAR(255),
        (p_receipt_data->>'status')::VARCHAR(50),
        (p_receipt_data->>'date_time')::VARCHAR(100),
        (p_receipt_data->>'payment_method')::VARCHAR(50)
    ) RETURNING id INTO donation_id;
    
    RETURN donation_id;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.donations TO anon, authenticated;
GRANT ALL ON public.donation_stats TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_recent_donations(INTEGER) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION insert_donation_with_receipt(VARCHAR, VARCHAR, DECIMAL, VARCHAR, VARCHAR, TEXT, JSONB, DECIMAL, TEXT) TO anon, authenticated;

-- Insert sample data for testing (optional)
-- INSERT INTO public.donations (
--     name, email, amount, transaction_id, phone, message,
--     receipt_processing_status, receipt_confidence,
--     sender_name, sender_phone, from_account, from_upi_id,
--     recipient_name, to_upi_id, payment_status, payment_date_time, payment_method
-- ) VALUES (
--     'Mira Bai Jena',
--     'mira@example.com',
--     3000.00,
--     '520758462580',
--     '+91 87639 59773',
--     'Test donation with receipt processing',
--     'completed',
--     1.00,
--     'Mira Bai Jena',
--     '+91 87639 59773',
--     'NABIN KUMAR SAHU (State Bank of India)',
--     'mirabaijena1c-4@oksbi',
--     'MANISH KUMAR',
--     'mk10092004-1@oksbi',
--     'Completed',
--     '26 Jul 2025, 8:08 pm',
--     'UPI'
-- );

-- Display table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'donations' 
AND table_schema = 'public'
ORDER BY ordinal_position; 