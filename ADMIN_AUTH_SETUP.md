# Admin Authentication Setup

## Overview
The admin routes (`/admin` and `/admin/newsletters`) are now protected with localStorage-based authentication.

## Setup Instructions

### 1. Environment Variables
Add the following to your `.env.local` file:

```env
NEXT_PUBLIC_ADMIN_SECRET=your_secure_secret_here
```

Replace `your_secure_secret_here` with a strong, random string.

### 2. Accessing Admin Routes

To access admin routes, you need to set the admin secret in your browser's localStorage:

#### Option 1: Using Browser Console
1. Open your website in a browser
2. Open Developer Tools (F12 or Right-click → Inspect)
3. Go to the Console tab
4. Run the following command:

```javascript
localStorage.setItem('ADMIN_SECRET', 'your_secure_secret_here');
```

Replace `your_secure_secret_here` with the same value you set in your `.env.local` file.

#### Option 2: Create a Helper Page (Optional)
You can create a simple login page that sets this value for you.

### 3. Verification
After setting the localStorage value:
1. Navigate to `/admin` or `/admin/newsletters`
2. You should now have access to the admin dashboard

### 4. Logout
To logout, simply clear the localStorage value:

```javascript
localStorage.removeItem('ADMIN_SECRET');
```

## Security Notes
- The `ADMIN_SECRET` is stored in localStorage and checked on the client-side
- For production use, consider implementing a more robust authentication system (e.g., NextAuth.js, Supabase Auth)
- This is a basic protection mechanism suitable for internal tools or low-security admin panels
- Never commit your actual secret to version control

## How It Works
1. When a user visits an admin route, the page checks localStorage for the `ADMIN_SECRET` key
2. It compares the stored value with `process.env.NEXT_PUBLIC_ADMIN_SECRET`
3. If they match, access is granted
4. If they don't match or the key is missing, the user is redirected to the home page (`/`)

