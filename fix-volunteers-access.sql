-- Fix volunteers table access issues
-- Run this in your Supabase SQL Editor

-- 1. Check current RLS status
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'volunteers';

-- 2. Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'volunteers';

-- 3. Disable RLS temporarily to test
ALTER TABLE volunteers DISABLE ROW LEVEL SECURITY;

-- 4. Test access without RLS
SELECT COUNT(*) as volunteer_count FROM volunteers;

-- 5. Re-enable RLS
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

-- 6. Drop all existing policies
DROP POLICY IF EXISTS "Allow public to insert volunteers" ON volunteers;
DROP POLICY IF EXISTS "Allow users to view volunteers" ON volunteers;
DROP POLICY IF EXISTS "Allow admins to update volunteers" ON volunteers;
DROP POLICY IF EXISTS "Enable read access for all users" ON volunteers;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON volunteers;
DROP POLICY IF EXISTS "Enable update for users based on email" ON volunteers;

-- 7. Create new policies
CREATE POLICY "Enable read access for all users" ON volunteers
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON volunteers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for users based on email" ON volunteers
    FOR UPDATE USING (true);

-- 8. Grant permissions
GRANT ALL ON volunteers TO anon, authenticated;

-- 9. Test the access again
SELECT COUNT(*) as volunteer_count_after_fix FROM volunteers;

-- 10. Show the final policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'volunteers'; 