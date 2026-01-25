# Gemini API Proxy Setup

## Problem
The Gemini API key was previously exposed to the client-side using `NEXT_PUBLIC_NEXT_PUBLIC_GEMINI_API_KEY`, which is a security risk in production. This could lead to:
- API key exposure in browser developer tools
- Unauthorized usage of your API key
- Potential quota exhaustion

## Solution
Created a secure proxy architecture:

### 1. Server-Side API Key
- Changed from `NEXT_PUBLIC_NEXT_PUBLIC_GEMINI_API_KEY` to `NEXT_PUBLIC_GEMINI_API_KEY`
- The API key is now only accessible server-side
- No longer exposed to client-side code

### 2. Proxy API Route
Created `/api/gemini-proxy` that:
- Handles all Gemini API calls server-side
- Keeps the API key secure
- Provides a clean interface for client-side code

### 3. Updated Receipt Processing
Modified `/api/parse-receipt` to:
- Use the proxy instead of direct Gemini calls
- Maintain the same functionality
- Keep the API key secure

## Files Changed

### New Files
- `src/app/api/gemini-proxy/route.ts` - Secure proxy for Gemini API calls
- `src/app/api/test-gemini-proxy/route.ts` - Test endpoint for debugging

### Modified Files
- `src/app/api/parse-receipt/route.ts` - Now uses proxy instead of direct Gemini calls
- `.env` - Changed environment variable name
- `render.yaml` - Added new environment variable for deployment

## Environment Variables

### Local Development
Update your `.env` file:
```env
# Remove this line
# NEXT_PUBLIC_NEXT_PUBLIC_GEMINI_API_KEY=your_key_here

# Add this line instead
NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
```

### Production Deployment
Add the environment variable to your deployment platform:

**Render.com:**
- Go to your service dashboard
- Navigate to Environment
- Add `NEXT_PUBLIC_GEMINI_API_KEY` with your API key value

**Vercel:**
- Go to your project settings
- Navigate to Environment Variables
- Add `NEXT_PUBLIC_GEMINI_API_KEY` with your API key value

**Other platforms:**
- Add `NEXT_PUBLIC_GEMINI_API_KEY` to your environment variables

## Testing

### 1. Test the Proxy Configuration
```bash
curl https://your-domain.com/api/test-gemini-proxy
```

Expected response:
```json
{
  "message": "Gemini proxy test endpoint",
  "geminiConfigured": true,
  "geminiKeyLength": 39,
  "environment": "production"
}
```

### 2. Test Receipt Processing
- Navigate to your donation form
- Upload a receipt image
- Check that processing works correctly
- Verify no API key exposure in browser dev tools

## Security Benefits

1. **API Key Protection**: The key is never sent to the client
2. **Rate Limiting**: All requests go through your server
3. **Error Handling**: Better control over error responses
4. **Logging**: Server-side logging for debugging

## Troubleshooting

### API Key Not Configured
If you see "Gemini API key not configured":
1. Check that `NEXT_PUBLIC_GEMINI_API_KEY` is set in your environment
2. Restart your development server
3. Redeploy to production

### Proxy Errors
If the proxy fails:
1. Check the server logs for detailed error messages
2. Verify the API key is valid
3. Test with the `/api/test-gemini-proxy` endpoint

### Production Issues
If it works locally but not in production:
1. Ensure `NEXT_PUBLIC_GEMINI_API_KEY` is set in your deployment environment
2. Check that the environment variable is not prefixed with `NEXT_PUBLIC_`
3. Redeploy after adding the environment variable

## Migration Checklist

- [ ] Update `.env` file with `NEXT_PUBLIC_GEMINI_API_KEY`
- [ ] Add `NEXT_PUBLIC_GEMINI_API_KEY` to production environment variables
- [ ] Test locally with `npm run dev`
- [ ] Deploy to production
- [ ] Test receipt processing in production
- [ ] Verify no API key exposure in browser dev tools

## API Endpoints

### `/api/gemini-proxy` (POST)
Secure proxy for Gemini API calls.

**Request:**
```json
{
  "prompt": "Your prompt here",
  "imageData": "base64_encoded_image",
  "mimeType": "image/jpeg"
}
```

**Response:**
```json
{
  "success": true,
  "data": "Gemini response text"
}
```

### `/api/parse-receipt` (POST)
Receipt processing endpoint (unchanged interface).

### `/api/test-gemini-proxy` (GET)
Test endpoint to verify proxy configuration. 