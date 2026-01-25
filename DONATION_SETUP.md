# Donation System Setup Guide

This guide will help you set up the complete donation system with QR code scanning and Supabase integration.

## Features

- ✅ QR Code generation for UPI payments
- ✅ Donation form with Supabase integration
- ✅ Admin dashboard for managing donations
- ✅ Real-time donation statistics
- ✅ Email verification system
- ✅ Transaction verification workflow

## Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **UPI ID**: Get a UPI ID for your NGO (e.g., `your-ngo@upi`)
3. **Node.js**: Version 16 or higher

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase Database Setup

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the SQL script from `supabase-schema.sql`:

```sql
-- Copy and paste the entire content of supabase-schema.sql
-- This will create the donations table, indexes, and views
```

### 3. Update UPI ID

In `src/components/DonationForm.tsx`, replace the placeholder UPI ID:

```typescript
// Replace this line
const upiId = "your-ngo@upi"; // Replace with your actual UPI ID

// With your actual UPI ID
const upiId = "your-actual-upi-id@bank";
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Development Server

```bash
npm run dev
```

## Usage

### For Donors

1. Visit `/donate` page
2. Scan the QR code with any UPI payment app
3. Make the payment
4. Fill out the verification form with:
   - Your name and email
   - Amount donated
   - Transaction ID from your payment app
   - Optional phone number and message

### For Admins

1. Visit `/admin` page
2. View donation statistics
3. Manage pending donations:
   - Verify donations by clicking "Verify"
   - Reject donations by clicking "Reject"
4. Monitor donation trends

## Database Schema

The system uses the following main table:

### donations
- `id`: Unique identifier
- `name`: Donor's name
- `email`: Donor's email
- `amount`: Donation amount
- `transaction_id`: Payment transaction ID
- `phone`: Optional phone number
- `message`: Optional message
- `status`: pending_verification, verified, or rejected
- `created_at`: Timestamp when donation was submitted
- `updated_at`: Timestamp when donation was last updated
- `verified_at`: Timestamp when donation was verified
- `verified_by`: Admin who verified the donation
- `notes`: Admin notes

## Customization

### QR Code Styling

You can customize the QR code appearance in `src/components/QRCodeGenerator.tsx`:

```typescript
const qrDataUrl = await QRCode.toDataURL(upiUrl, {
  width: 200, // Change size
  margin: 2,  // Change margin
  color: {
    dark: "#000000",  // Change dark color
    light: "#FFFFFF"  // Change light color
  }
});
```

### Form Fields

Add or remove form fields in `src/components/DonationForm.tsx`:

```typescript
interface DonationFormData {
  name: string;
  email: string;
  amount: number;
  transactionId: string;
  phone?: string;
  message?: string;
  // Add new fields here
}
```

### Email Notifications

To add email notifications, you can:

1. Use Supabase Edge Functions
2. Integrate with services like SendGrid or Resend
3. Set up webhooks for donation events

Example Edge Function for email notifications:

```typescript
// supabase/functions/send-donation-email/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { donation } = await req.json()
  
  // Send email logic here
  
  return new Response(
    JSON.stringify({ message: "Email sent" }),
    { headers: { "Content-Type": "application/json" } },
  )
})
```

## Security Considerations

1. **Row Level Security**: The database uses RLS policies to secure data
2. **Input Validation**: All form inputs are validated
3. **Rate Limiting**: Consider implementing rate limiting for form submissions
4. **Admin Authentication**: Implement proper admin authentication for the admin dashboard

## Troubleshooting

### QR Code Not Generating
- Check if the `qrcode` package is installed
- Verify the UPI ID format is correct
- Check browser console for errors

### Database Connection Issues
- Verify Supabase environment variables
- Check if the database schema is properly set up
- Ensure RLS policies are configured correctly

### Form Submission Errors
- Check Supabase connection
- Verify table permissions
- Check browser console for detailed error messages

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify all environment variables are set
3. Ensure the database schema is properly created
4. Check Supabase dashboard for connection issues

## Future Enhancements

- [ ] Real-time donation notifications
- [ ] Email verification system
- [ ] Donation receipt generation
- [ ] Integration with payment gateways
- [ ] Donation analytics and reporting
- [ ] Mobile app for admin management 