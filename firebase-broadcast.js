
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
