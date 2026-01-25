# Setup Guide for OpenAI Receipt Processing

## Prerequisites

1. **OpenAI API Key**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Supabase Account**: Set up a Supabase project at [supabase.com](https://supabase.com)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI Configuration (Required for receipt processing)
OPENAI_API_KEY=your_openai_api_key

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL commands from `supabase-schema.sql`
4. This will create the donations table with receipt processing fields

## UPI Configuration

1. Open `src/components/DonationForm.tsx`
2. Replace `"your-ngo@upi"` with your actual UPI ID
3. Update the payee name if needed

## Testing the Receipt Processing

1. Start the development server: `npm run dev`
2. Navigate to `/donate`
3. Click "Show" in the receipt upload section
4. Upload a receipt screenshot
5. Click "Process with AI"
6. Check the console for processing results

## Admin Dashboard

1. Navigate to `/admin`
2. View processed receipts and their confidence scores
3. Click "View Receipt Data" to see AI-extracted information
4. Verify or reject donations as needed

## Troubleshooting

### OpenAI API Errors
- Ensure your API key is correct
- Check your OpenAI account has sufficient credits
- Verify the API key has access to GPT-4 Vision

### Database Errors
- Ensure all SQL commands from `supabase-schema.sql` were executed
- Check your Supabase connection settings
- Verify RLS policies are correctly configured

### File Upload Issues
- Ensure the image is less than 5MB
- Check the file is a valid image format (PNG, JPG, etc.)
- Verify the image contains readable text

## Cost Considerations

- OpenAI GPT-4 Vision API costs approximately $0.01-0.03 per image
- Monitor your OpenAI usage in the platform dashboard
- Consider implementing rate limiting for production use

## Security Notes

- Never commit your `.env.local` file to version control
- Use environment variables for all sensitive data
- Consider implementing user authentication for the admin dashboard
- Add rate limiting to prevent API abuse 