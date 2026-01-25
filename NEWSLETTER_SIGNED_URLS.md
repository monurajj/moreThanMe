# Newsletter Module - Signed URLs Implementation

## 🔐 Why Signed URLs?

### Public URLs vs Signed URLs

| Feature | Public URLs | Signed URLs |
|---------|-------------|-------------|
| **Bucket Type** | Public bucket | Private bucket |
| **Security** | Anyone with URL can access | Time-limited, secure access |
| **Expiration** | Never expires | Expires after set time (1 hour) |
| **Use Case** | Public content | Private/controlled content |
| **URL Format** | `.../public/...` | `.../sign/...?token=...` |

### Our Implementation

We use **Signed URLs** for better security and control:

```typescript
const { data: signedData, error: signedError } = await supabase.storage
  .from('newsletters')
  .createSignedUrl(cleanPath, 3600); // 1 hour = 3600 seconds
```

**Benefits:**
- ✅ Works with both public and private buckets
- ✅ URLs expire after 1 hour (prevents long-term sharing)
- ✅ More secure than permanent public URLs
- ✅ Can track access through Supabase logs

## 📱 In-App PDF Viewer

### Features

1. **Full-Screen Modal**
   - Opens PDF in overlay modal
   - No redirect to new tab
   - Better user experience

2. **Controls**
   - **Download**: Save PDF to device
   - **Open in New Tab**: Traditional browser PDF viewer
   - **Close**: Return to newsletter list

3. **Responsive Design**
   - Works on mobile, tablet, desktop
   - Adaptive sizing
   - Touch-friendly controls

### Component Structure

```
NewsletterList
  └── NewsletterCategorySection (per category)
        ├── Newsletter Cards
        └── PDFViewer Modal (when clicked)
              ├── Header (title + controls)
              ├── PDF iframe
              └── Close overlay
```

## 🔄 URL Refresh Flow

### Problem: Signed URLs Expire

Signed URLs expire after 1 hour. If a user keeps the page open longer:

**Current Behavior:**
- URLs are generated when page loads
- Valid for 1 hour
- After 1 hour, PDF won't load

**Solution Options:**

1. **Refresh on Click** (Recommended for production)
   - Generate signed URL when user clicks "View PDF"
   - Always fresh URL
   - Requires API call per view

2. **Auto-Refresh** (Current implementation)
   - Generate URLs on page load
   - Good for 1 hour
   - Simple implementation

### Implementing Refresh on Click

To generate URLs on-demand:

```typescript
// Create new API endpoint: /api/newsletters/[id]/signed-url
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient(...);
  
  // Fetch newsletter by ID
  const { data: newsletter } = await supabase
    .from('newsletters')
    .select('file_path')
    .eq('id', params.id)
    .single();
  
  // Generate fresh signed URL
  const { data: signedData } = await supabase.storage
    .from('newsletters')
    .createSignedUrl(newsletter.file_path, 3600);
  
  return NextResponse.json({ url: signedData.signedUrl });
}
```

Then update `NewsletterCategorySection`:

```typescript
const handleViewPDF = async (newsletter: Newsletter) => {
  // Fetch fresh signed URL
  const response = await fetch(`/api/newsletters/${newsletter.id}/signed-url`);
  const { url } = await response.json();
  
  setSelectedNewsletter({ ...newsletter, url });
};
```

## 🎨 PDF Viewer Component

### Key Features

```typescript
<PDFViewer
  url={signedUrl}           // Signed URL from API
  title={newsletter.title}  // Display title
  onClose={() => ...}       // Close handler
/>
```

### Controls Explained

1. **Download Button**
   - Creates temporary `<a>` element
   - Triggers browser download
   - Removes element after download

2. **Open in New Tab**
   - Uses `window.open(url, '_blank')`
   - Opens in browser's PDF viewer
   - Useful for printing or full-screen

3. **Close Button**
   - Closes modal
   - Returns to newsletter list
   - Clears selected newsletter state

### Loading State

- Shows spinner while PDF loads
- Prevents blank screen
- Better UX

### Mobile Considerations

- Full-screen on mobile
- Touch-friendly buttons
- Responsive iframe sizing
- Pinch-to-zoom support (browser native)

## 🔒 Security Best Practices

### 1. Service Role Key Usage

✅ **DO:**
- Use service role key in API routes only
- Generate signed URLs server-side
- Never expose service key to client

❌ **DON'T:**
- Use service key in client components
- Store service key in public env vars
- Log service key in console

### 2. Signed URL Expiration

**Current:** 1 hour (3600 seconds)

**Adjust based on use case:**
```typescript
// 30 minutes
createSignedUrl(path, 1800)

// 24 hours
createSignedUrl(path, 86400)

// 7 days
createSignedUrl(path, 604800)
```

**Recommendation:** 1-2 hours for newsletters

### 3. Bucket Configuration

**Option A: Private Bucket** (Recommended)
- Requires signed URLs
- More secure
- Better access control

**Option B: Public Bucket**
- Signed URLs still work
- Less secure
- Anyone with URL can access

## 📊 Performance Considerations

### Current Implementation

- Generates all signed URLs on page load
- One API call to fetch all newsletters
- URLs cached in frontend state

**Pros:**
- Fast initial load
- Single API call
- Good for small number of newsletters

**Cons:**
- URLs expire after 1 hour
- Generates URLs for unseen PDFs

### Optimization for Large Scale

If you have 100+ newsletters:

1. **Lazy Loading**
   - Generate URLs only when category is expanded
   - Reduces initial load time

2. **On-Demand Generation**
   - Generate URL when user clicks "View PDF"
   - Only generates URLs for viewed PDFs

3. **Caching Strategy**
   - Cache signed URLs in localStorage
   - Check expiration before use
   - Refresh if expired

## 🐛 Troubleshooting

### PDF Not Displaying in Modal

**Check:**
1. Browser console for errors
2. Network tab for 403/404 errors
3. Signed URL is valid (not expired)
4. File exists in Supabase Storage

**Common Issues:**
- CORS errors → Check Supabase CORS settings
- 403 Forbidden → Service role key issue
- 404 Not Found → File path incorrect
- Blank iframe → PDF might be corrupted

### Modal Not Opening

**Check:**
1. Click handler is attached
2. State is updating correctly
3. No JavaScript errors
4. z-index conflicts with other modals

### Download Not Working

**Check:**
1. Signed URL is still valid
2. Browser allows downloads
3. Pop-up blocker settings
4. CORS headers allow download

## 📝 Code Summary

### Files Changed

1. **`src/app/api/newsletters/route.ts`**
   - Changed from `getPublicUrl()` to `createSignedUrl()`
   - Added error handling for URL generation
   - Changed `forEach` to `for...of` for async operations

2. **`src/components/newsletters/PDFViewer.tsx`** (NEW)
   - Full-screen modal component
   - PDF iframe viewer
   - Download and open controls

3. **`src/components/newsletters/NewsletterCategorySection.tsx`**
   - Added state for selected newsletter
   - Changed `<a>` to `<button>` for modal trigger
   - Integrated PDFViewer component

## ✅ Testing Checklist

- [ ] Upload test PDF to Supabase Storage
- [ ] Add newsletter via admin form
- [ ] View newsletter list
- [ ] Click "View PDF" button
- [ ] Verify PDF displays in modal
- [ ] Test download button
- [ ] Test open in new tab button
- [ ] Test close button
- [ ] Test on mobile device
- [ ] Test with expired URL (wait 1 hour)

## 🚀 Future Enhancements

1. **PDF.js Integration**
   - Better PDF rendering
   - Custom controls (zoom, page navigation)
   - Search within PDF

2. **Thumbnail Previews**
   - Generate PDF thumbnails
   - Show in newsletter cards
   - Better visual preview

3. **Analytics**
   - Track PDF views
   - Most popular newsletters
   - Download statistics

4. **Offline Support**
   - Cache PDFs for offline viewing
   - Service worker integration
   - Progressive Web App features

