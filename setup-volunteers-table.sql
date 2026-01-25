-- Setup Volunteers Table
-- Run this in your Supabase SQL Editor

-- Create volunteers table if it doesn't exist
CREATE TABLE IF NOT EXISTS volunteers (
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_volunteers_email ON volunteers(university_email);
CREATE INDEX IF NOT EXISTS idx_volunteers_created_at ON volunteers(created_at);
CREATE INDEX IF NOT EXISTS idx_volunteers_batch ON volunteers(batch);
CREATE INDEX IF NOT EXISTS idx_volunteers_course ON volunteers(course);

-- Create trigger to automatically update updated_at (if function exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column') THEN
        CREATE TRIGGER update_volunteers_updated_at 
            BEFORE UPDATE ON volunteers 
            FOR EACH ROW 
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Enable Row Level Security (RLS)
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public to insert volunteers
CREATE POLICY "Allow public to insert volunteers" ON volunteers
    FOR INSERT WITH CHECK (true);

-- Create policy to allow users to view volunteers
CREATE POLICY "Allow users to view volunteers" ON volunteers
    FOR SELECT USING (true);

-- Create policy to allow admins to update volunteers
CREATE POLICY "Allow admins to update volunteers" ON volunteers
    FOR UPDATE USING (true);

-- Grant necessary permissions
GRANT ALL ON volunteers TO anon, authenticated;

-- Insert some sample volunteers (optional - remove if you don't want sample data)
-- INSERT INTO volunteers (name, university_email, enrollment, batch, course, phone, message) VALUES
--   ('John Doe', 'john.doe@rishihood.edu.in', 'RU2023001', '2023', 'BTECH', '+91 9876543210', 'I want to make a difference in our community'),
--   ('Jane Smith', 'jane.smith@rishihood.edu.in', 'RU2023002', '2023', 'BBA', '+91 9876543211', 'Passionate about helping others'),
--   ('Mike Johnson', 'mike.johnson@rishihood.edu.in', 'RU2023003', '2023', 'BDES', '+91 9876543212', 'Ready to contribute to positive change');

-- Verify the table was created
SELECT 'Volunteers table created successfully!' as status; 