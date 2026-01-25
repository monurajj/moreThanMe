-- Fix RLS policies for volunteers table
-- Run this in your Supabase SQL Editor

-- First, let's check the current RLS status
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'volunteers';

-- Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'volunteers';

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public to insert volunteers" ON volunteers;
DROP POLICY IF EXISTS "Allow users to view volunteers" ON volunteers;
DROP POLICY IF EXISTS "Allow admins to update volunteers" ON volunteers;

-- Create new policies
CREATE POLICY "Allow public to insert volunteers" ON volunteers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users to view volunteers" ON volunteers
    FOR SELECT USING (true);

CREATE POLICY "Allow admins to update volunteers" ON volunteers
    FOR UPDATE USING (true);

-- Grant necessary permissions
GRANT ALL ON volunteers TO anon, authenticated;

-- Test the access
SELECT COUNT(*) as volunteer_count FROM volunteers; 