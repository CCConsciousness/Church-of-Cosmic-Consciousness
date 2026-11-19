
// CCC Cosmic Broadcast Network
// Public announcement reader — read-only.

import { initializeApp, getApps, getApp } from
  "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

import { getFirestore, collection, getDocs }
  from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAh7nSd5szySNnOaLxNo2yGWBwmJx2c7I8",
  authDomain: "ccc-cosmic-broadcast-network.firebaseapp.com",
  projectId: "ccc-cosmic-broadcast-network",
  storageBucket: "ccc-cosmic-broadcast-network.firebasestorage.app",
  messagingSenderId: "317799195252",
  appId: "1:317799195252:web:f92bd63d593d82b25ee721"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getCosmicAnnouncements() {
  const snapshot = await getDocs(collection(db, "announcements"));

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

// CCC Firebase connection test
getCosmicAnnouncements()
  .then(announcements => {
    console.log(
      "CCC FIREBASE CONNECTED:",
      announcements.length,
      "announcement(s)"
    );
  })
  .catch(error => {
    console.error("CCC FIREBASE ERROR:", error);
  });

// Temporary Firebase connection indicator
const statusBanner = document.createElement("div");

statusBanner.style.cssText =
  "position:fixed;top:0;left:0;right:0;" +
  "z-index:99999;padding:12px;" +
  "background:#142b39;color:white;" +
  "font:14px Arial;text-align:center;";

statusBanner.textContent = "Firebase: Connecting...";
document.body.appendChild(statusBanner);

getCosmicAnnouncements()
  .then(announcements => {
    statusBanner.textContent =
      "Firebase CONNECTED: " +
      announcements.length + " announcement(s)";
  })
  .catch(error => {
    statusBanner.textContent =
      "Firebase ERROR: " + error.code;
  });
