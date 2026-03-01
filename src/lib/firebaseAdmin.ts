import * as admin from "firebase-admin";

function getAdminApp() {
  if (admin.apps.length > 0) {
    return admin.app();
  }
  const projectId = process.env.FIREBASE_PROJECT_ID || "morethanme-b4623";
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (clientEmail?.includes("xxxxx") || clientEmail === "firebase-adminsdk@morethanme-b4623.iam.gserviceaccount.com") {
    throw new Error(
      "FIREBASE_CLIENT_EMAIL is still a placeholder. Open the same JSON file you used for the private key, copy the \"client_email\" value (e.g. firebase-adminsdk-abc12@morethanme-b4623.iam.gserviceaccount.com), and set it in .env.local as FIREBASE_CLIENT_EMAIL=..."
    );
  }
  if (clientEmail && privateKey) {
    return admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    });
  }
  const saJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (saJson) {
    try {
      const sa = JSON.parse(saJson);
      return admin.initializeApp({ credential: admin.credential.cert(sa) });
    } catch {
      console.error("Invalid FIREBASE_SERVICE_ACCOUNT_JSON");
    }
  }
  throw new Error(
    "Firebase Admin not configured. Set FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY, or FIREBASE_SERVICE_ACCOUNT_JSON. " +
      "Get these from Firebase Console → Project Settings → Service Accounts → Generate new private key."
  );
}

getAdminApp();
export const adminDb = admin.firestore();
