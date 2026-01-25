-- Create donation_stats view if it doesn't exist
CREATE OR REPLACE VIEW donation_stats AS
SELECT
    COUNT(*) as total_donations,
    COUNT(CASE WHEN status = 'verified' THEN 1 END) as verified_donations,
    COUNT(CASE WHEN status = 'pending_verification' THEN 1 END) as pending_donations,
    SUM(CASE WHEN status = 'verified' THEN amount ELSE 0 END) as total_amount_verified,
    AVG(CASE WHEN status = 'verified' THEN amount END) as average_donation_amount,
    COUNT(CASE WHEN receipt_processing_status = 'completed' THEN 1 END) as receipts_processed
FROM donations;
