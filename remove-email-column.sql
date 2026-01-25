-- Remove email column from donations table (if it exists)
-- Run this in your Supabase SQL Editor if you have an existing table with email column

-- First, check if the email column exists
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'donations' 
        AND column_name = 'email'
    ) THEN
        -- Remove the email column
        ALTER TABLE donations DROP COLUMN email;
        RAISE NOTICE 'Email column removed from donations table';
    ELSE
        RAISE NOTICE 'Email column does not exist in donations table';
    END IF;
END $$;

-- Remove email index if it exists
DROP INDEX IF EXISTS idx_donations_email; 