import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

export function getAdminAuth() {
  if (!getApps().length) {
    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const rawPrivateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY || "";
    const privateKey = rawPrivateKey.replace(/\\n/g, "\n").replace(/^"|"$/g, "").trim();

    if (projectId && clientEmail && privateKey) {
      try {
        initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey,
          }),
        });
      } catch (err) {
        console.error("Firebase Admin initialization error:", err);
      }
    } else {
      console.error("Missing Firebase Admin Environment Variables on server:", {
        hasProjectId: !!projectId,
        hasClientEmail: !!clientEmail,
        hasPrivateKey: !!privateKey,
      });
    }
  }

  return getApps().length ? getAuth() : null;
}
