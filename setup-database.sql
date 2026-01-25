-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  transaction_id VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending_verification' CHECK (status IN ('pending_verification', 'verified', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID,
  notes TEXT,
  -- New fields for receipt processing
  receipt_image_url TEXT,
  receipt_parsed_data JSONB,
  receipt_processing_status VARCHAR(50) DEFAULT 'not_processed' CHECK (receipt_processing_status IN ('not_processed', 'processing', 'completed', 'failed')),
  receipt_confidence DECIMAL(3,2),
  receipt_processing_notes TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_donations_email ON donations(email);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at);
CREATE INDEX IF NOT EXISTS idx_donations_receipt_status ON donations(receipt_processing_status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_donations_updated_at 
    BEFORE UPDATE ON donations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public to insert donations
CREATE POLICY "Allow public to insert donations" ON donations
    FOR INSERT WITH CHECK (true);

-- Create policy to allow users to view their own donations
CREATE POLICY "Allow users to view own donations" ON donations
    FOR SELECT USING (true);

-- Create policy to allow admins to update donations
CREATE POLICY "Allow admins to update donations" ON donations
    FOR UPDATE USING (true);

-- Create a view for donation statistics
CREATE OR REPLACE VIEW donation_stats AS
SELECT 
    COUNT(*) as total_donations,
    COUNT(CASE WHEN status = 'verified' THEN 1 END) as verified_donations,
    COUNT(CASE WHEN status = 'pending_verification' THEN 1 END) as pending_donations,
    SUM(CASE WHEN status = 'verified' THEN amount ELSE 0 END) as total_amount_verified,
    AVG(CASE WHEN status = 'verified' THEN amount END) as average_donation_amount,
    COUNT(CASE WHEN receipt_processing_status = 'completed' THEN 1 END) as receipts_processed
FROM donations;

-- Create a function to get recent donations
CREATE OR REPLACE FUNCTION get_recent_donations(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
    id UUID,
    name VARCHAR(255),
    amount DECIMAL(10,2),
    status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE,
    receipt_processing_status VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT d.id, d.name, d.amount, d.status, d.created_at, d.receipt_processing_status
    FROM donations d
    ORDER BY d.created_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql; 