# Testing the Receipt Processing Feature

## Environment Setup ✅

The environment variables are now properly configured:
- ✅ OpenAI API Key: Configured (164 characters)
- ✅ Supabase URL: Configured
- ✅ Supabase Anon Key: Configured

## Testing Steps

### 1. Test API Connection
1. Go to `/donate`
2. Click "Show" in the receipt upload section
3. Click "Test API" button
4. Check the alert for API status

### 2. Test with Sample Receipt
1. Create a sample UPI receipt screenshot with this format:
   ```
   Sender Name: Mira Bai Jena
   Phone Number: +91 87639 59773
   From Account: Nabin Kumar Sahu (State Bank of India)
   From UPI ID: mirabaijena1c-4@oksbi
   Recipient Name: Manish Kumar
   To UPI ID: mk10092004-1@oksbi
   Amount: ₹3,000
   Status: ✅ Completed
   Date & Time: 26 July 2025, 8:08 PM
   ```

2. Upload the screenshot
3. Click "Process with AI"
4. Check console logs for detailed output

### 3. Check Console Logs
The system now provides detailed console logging:

**Frontend Logs (Browser Console):**
```
=== RECEIPT PROCESSING SUCCESS ===
📄 Receipt Data: {sender_name: "Mira Bai Jena", ...}
🎯 Confidence Score: 85%
💰 Amount Extracted: ₹3000
👤 Sender: Mira Bai Jena
📱 Phone: +91 87639 59773
🏦 From Account: Nabin Kumar Sahu (State Bank of India)
🆔 From UPI ID: mirabaijena1c-4@oksbi
👥 Recipient: Manish Kumar
🎯 To UPI ID: mk10092004-1@oksbi
✅ Status: Completed
📅 Date & Time: 26 July 2025, 8:08 PM
🆔 Transaction ID: [extracted]
💳 Payment Method: UPI
=== END RECEIPT PROCESSING ===
```

**Backend Logs (Server Console):**
```
Processing file: receipt.jpg Size: 245760 Type: image/jpeg
Calling OpenAI API...
OpenAI API response received
Raw OpenAI response: {"sender_name": "Mira Bai Jena", ...}
Extracted JSON: {"sender_name": "Mira Bai Jena", ...}
=== OPENAI RECEIPT PROCESSING ===
📄 Raw OpenAI Response: {...}
🎯 Parsed Data: {...}
=== END OPENAI PROCESSING ===
```

## Troubleshooting

### If you get a 500 error:
1. Check server console for detailed error messages
2. Verify OpenAI API key is correct
3. Check if the image is valid (PNG, JPG, < 5MB)
4. Ensure the image contains readable text

### If parsing fails:
1. Check the console for the raw OpenAI response
2. Verify the image quality and text clarity
3. Try with a different receipt format

## Expected Behavior

1. **File Upload**: Should accept image files up to 5MB
2. **Processing**: Should show "Processing..." during API call
3. **Results**: Should display extracted data with confidence scores
4. **Auto-fill**: Should populate form fields if confidence > 70%
5. **Console**: Should show detailed logs for debugging

## Sample Test Data

Use this format for testing:
```
Sender: Mira Bai Jena
Phone: +91 87639 59773
From Account: Nabin Kumar Sahu (State Bank of India)
From UPI ID: mirabaijena1c-4@oksbi
Recipient: Manish Kumar
To UPI ID: mk10092004-1@oksbi
Amount: ₹3,000
Status: ✅ Completed
Date & Time: 26 July 2025, 8:08 PM
``` 