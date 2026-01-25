-- Check the current structure of donation_stats view
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'donation_stats' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check if there are any donations in the table
SELECT COUNT(*) as total_donations, 
       SUM(amount) as total_amount,
       AVG(amount) as average_amount,
       MAX(amount) as max_amount
FROM donations;

-- Check a few sample donations
SELECT id, name, amount, status, created_at
FROM donations
ORDER BY created_at DESC
LIMIT 5; 