# Receipt Processing Test Guide

## ✅ **Issues Fixed:**

1. **✅ OpenAI Model Updated**: Changed from deprecated `gpt-4-vision-preview` to `gpt-4o`
2. **✅ CORS Headers Added**: All API responses now include proper CORS headers
3. **✅ API Endpoints Fixed**: Using relative paths instead of hardcoded ports
4. **✅ OPTIONS Handler Added**: For CORS preflight requests

## 🧪 **Testing Steps:**

### 1. Test API Connection
1. Go to `http://localhost:3001/donate`
2. Click "Show" in the receipt upload section
3. Click "Test API" button
4. Should show: `{"message": "Parse receipt API is working", "openaiConfigured": true}`

### 2. Test Receipt Processing
1. Create a test receipt image with this text:
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

2. Upload the image
3. Click "Process with AI"
4. Check console for detailed logs

### 3. Expected Console Output
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
=== END RECEIPT PROCESSING ===
```

## 🔧 **If You Still Get Errors:**

### CORS Error:
- Make sure you're accessing the app on the same port as the API
- Try accessing `http://localhost:3001/donate` instead of port 3000

### OpenAI Error:
- Check that your OpenAI API key is valid
- Verify you have credits in your OpenAI account
- The model `gpt-4o` should work with your API key

### Database Error:
- Run the SQL commands from `setup-database.sql` in your Supabase dashboard
- Make sure the `donations` table exists

## 📝 **Sample Test Receipt**

Create a simple image with this text for testing:
```
UPI Payment Receipt

Sender: Mira Bai Jena
Phone: +91 87639 59773
From Account: Nabin Kumar Sahu (State Bank of India)
From UPI ID: mirabaijena1c-4@oksbi

Recipient: Manish Kumar
To UPI ID: mk10092004-1@oksbi

Amount: ₹3,000
Status: ✅ Completed
Date: 26 July 2025, 8:08 PM
Transaction ID: UPI123456789
``` 