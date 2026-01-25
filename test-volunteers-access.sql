-- Test script to check volunteers table access
-- Run this in your Supabase SQL Editor

-- Check if the table exists
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'volunteers'
) as table_exists;

-- Check the table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'volunteers' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'volunteers';

-- Test a simple select
SELECT COUNT(*) as volunteer_count FROM volunteers;

-- Test selecting specific columns
SELECT id, name, university_email, enrollment, batch 
FROM volunteers 
LIMIT 3; 