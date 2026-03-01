# Firebase Migration Guide

The app has been migrated from Supabase to Firebase Firestore for all database storage.

## Setup

### 1. Firebase Admin SDK (required for API routes)

1. Go to [Firebase Console](https://console.firebase.google.com) → your project **morethanme-b4623**
2. Project Settings (gear) → **Service Accounts**
3. Click **Generate new private key**
4. Add to `.env`:

```env
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@morethanme-b4623.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Or paste the full JSON as `FIREBASE_SERVICE_ACCOUNT_JSON` (single line, escaped).

### 2. Firestore collections

Create these collections in Firestore (they are created automatically on first write):

- `admin_users` – admin login (email, password_hash, created_at)
- `volunteers` – Join Us signups
- `donations` – donation records
- `newsletters` – newsletter metadata
- `newsletter_sends` – send history
- `team_members` – team page
- `contact_submissions` – contact form
- `site_settings` – key-value (contact_email, contact_phone)
- `media_assets` – gallery images/videos

### 3. Seed super admin

```bash
curl -X POST "http://localhost:3000/api/admin/seed?key=YOUR_ADMIN_SECRET"
```

### 4. Firestore indexes (if needed)

For compound queries, Firestore may prompt you to create indexes. Follow the link in the error message.

## Data migration from Supabase

Export data from Supabase and import to Firestore using a script or Firebase Admin. Document structure should match the API expectations (field names, types).
