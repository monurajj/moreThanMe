-- Fix RLS policies that are blocking access to volunteers table
-- Run this in your Supabase SQL Editor

-- 1. Check current RLS status and policies
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'volunteers';

SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'volunteers';

-- 2. Drop all existing policies
DROP POLICY IF EXISTS "Allow public to insert volunteers" ON volunteers;
DROP POLICY IF EXISTS "Allow users to view volunteers" ON volunteers;
DROP POLICY IF EXISTS "Allow admins to update volunteers" ON volunteers;
DROP POLICY IF EXISTS "Enable read access for all users" ON volunteers;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON volunteers;
DROP POLICY IF EXISTS "Enable update for users based on email" ON volunteers;
DROP POLICY IF EXISTS "Allow all access" ON volunteers;

-- 3. Create a simple policy that allows all access
CREATE POLICY "volunteers_policy" ON volunteers
    FOR ALL USING (true)
    WITH CHECK (true);

-- 4. Grant all permissions
GRANT ALL ON volunteers TO anon, authenticated;

-- 5. Test the access
SELECT COUNT(*) as volunteer_count FROM volunteers;

-- 6. Show sample data
SELECT id, name, university_email, enrollment, batch 
FROM volunteers 
LIMIT 3; 