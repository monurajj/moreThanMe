-- Add unique constraint on transaction_id to prevent duplicate donations
-- Run this in your Supabase SQL Editor if you have an existing table

-- First, check if the constraint already exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'donations_transaction_id_unique'
        AND table_name = 'donations'
    ) THEN
        -- Add the unique constraint
        ALTER TABLE donations ADD CONSTRAINT donations_transaction_id_unique UNIQUE (transaction_id);
        RAISE NOTICE 'Unique constraint added to donations table';
    ELSE
        RAISE NOTICE 'Unique constraint already exists on donations table';
    END IF;
END $$; 