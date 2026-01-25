# Database Setup Instructions

## Step 1: Set up Supabase Database

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `tcvvgmhczaudqhzorrwi`
3. Navigate to **SQL Editor** in the left sidebar
4. Copy and paste the entire contents of `setup-database.sql` into the SQL editor
5. Click **Run** to execute the SQL commands

## Step 2: Verify Database Setup

After running the SQL, you should see:
- ✅ `donations` table created
- ✅ `donation_stats` view created
- ✅ Indexes created
- ✅ RLS policies configured

## Step 3: Test the Setup

1. Go to your Supabase dashboard
2. Navigate to **Table Editor**
3. You should see a `donations` table
4. Click on it to verify the structure

## Step 4: Update Environment Variables

Make sure your `.env.local` has the correct Supabase service role key:

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the **service_role** key (not the anon key)
3. Update your `.env.local`:

```env
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
```

## Step 5: Test the Application

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3001/donate`
3. Test the receipt processing feature
4. Check that donations are saved to the database

## Troubleshooting

### If you get "relation does not exist" errors:
- Make sure you ran the SQL commands in the correct Supabase project
- Check that the `donations` table exists in the Table Editor

### If you get permission errors:
- Make sure RLS policies are properly configured
- Check that your API keys are correct

### If the API still returns 500 errors:
- Check the server console for detailed error messages
- Verify that all environment variables are set correctly 