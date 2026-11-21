// Runs only in GitHub Actions with a private Firebase service-account secret.
// Never expose the secret to browser code, logs, or repository files.
const admin = require("firebase-admin");
const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
if (!raw) { console.error("Missing FIREBASE_SERVICE_ACCOUNT_JSON secret; no changes made."); process.exit(1); }
let credentials;
try { credentials = JSON.parse(raw); } catch { console.error("Invalid service-account JSON; no changes made."); process.exit(1); }
if (credentials.project_id !== "ccc-cosmic-broadcast-network") {
  console.error("Firebase project mismatch; no changes made."); process.exit(1);
}
admin.initializeApp({credential: admin.credential.cert(credentials)});
(async () => {
  let count = 0, token;
  do {
    const page = await admin.auth().listUsers(1000, token);
    count += page.users.length;
    token = page.pageToken;
  } while (token);
  await admin.firestore().doc("adminStats/membership").set({
    totalRegisteredAccounts: count,
    lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
    countSource: "firebase-auth-admin"
  }, {merge:true});
  console.log("CCC membership statistics synchronized successfully. Total accounts:", count);
})().catch(error => {
  console.error("Membership synchronization failed:", error.code || error.name || "unknown");
  process.exitCode = 1;
});
