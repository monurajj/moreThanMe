-- Create volunteers table
-- Run this in your Supabase SQL Editor

-- First, check if the table already exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'volunteers') THEN
        -- Create volunteers table
        CREATE TABLE volunteers (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            university_email VARCHAR(255) NOT NULL UNIQUE,
            enrollment VARCHAR(50) NOT NULL,
            batch VARCHAR(10) NOT NULL,
            course VARCHAR(50) NOT NULL,
            phone VARCHAR(20),
            message TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Create indexes
        CREATE INDEX idx_volunteers_email ON volunteers(university_email);
        CREATE INDEX idx_volunteers_created_at ON volunteers(created_at);
        CREATE INDEX idx_volunteers_batch ON volunteers(batch);
        CREATE INDEX idx_volunteers_course ON volunteers(course);

        -- Enable RLS
        ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

        -- Create policies
        CREATE POLICY "Allow public to insert volunteers" ON volunteers
            FOR INSERT WITH CHECK (true);

        CREATE POLICY "Allow users to view volunteers" ON volunteers
            FOR SELECT USING (true);

        CREATE POLICY "Allow admins to update volunteers" ON volunteers
            FOR UPDATE USING (true);

        -- Grant permissions
        GRANT ALL ON volunteers TO anon, authenticated;

        RAISE NOTICE 'Volunteers table created successfully!';
    ELSE
        RAISE NOTICE 'Volunteers table already exists!';
    END IF;
END $$;

-- Verify the table was created
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'volunteers' 
ORDER BY ordinal_position; 