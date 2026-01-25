-- Temporarily disable RLS to test access
-- Run this in your Supabase SQL Editor

-- 1. Check current RLS status
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'volunteers';

-- 2. Disable RLS temporarily
ALTER TABLE volunteers DISABLE ROW LEVEL SECURITY;

-- 3. Test access without RLS
SELECT COUNT(*) as volunteer_count FROM volunteers;

-- 4. Show some sample data
SELECT id, name, university_email, enrollment, batch 
FROM volunteers 
LIMIT 3;

-- 5. Re-enable RLS
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

-- 6. Create a simple policy that allows all access
DROP POLICY IF EXISTS "Allow all access" ON volunteers;

CREATE POLICY "Allow all access" ON volunteers
    FOR ALL USING (true)
    WITH CHECK (true);

-- 7. Grant permissions
GRANT ALL ON volunteers TO anon, authenticated;

-- 8. Test access again
SELECT COUNT(*) as volunteer_count_after_policy FROM volunteers; 