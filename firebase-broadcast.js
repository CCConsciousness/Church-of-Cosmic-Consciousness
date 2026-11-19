
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


// CCC Firestore announcement display
async function displayCosmicAnnouncements() {
  const section = document.createElement("section");
  section.id = "ccc-firebase-announcements";
  section.style.cssText =
    "max-width:900px;margin:24px auto;padding:16px;";

  const heading = document.createElement("h2");
  heading.textContent = "Latest Cosmic Broadcasts";
  section.appendChild(heading);

  const list = document.createElement("div");
  section.appendChild(list);

  try {
    const announcements = await getCosmicAnnouncements();

    // Avoid duplicating announcements already displayed.
    const existingText = document.body.innerText.toLowerCase();

    for (const item of announcements) {
      const title = String(item.title || "Announcement");

// Skip the welcome message already in the original feed.
if (item.id === "welcome-001") {
  continue;
}

      // Hide temporary publishing tests without deleting Firestore records.
      const bodyText = String(item.body || "");
      if (/firebase publishing test|publishing test/i.test(title + " " + bodyText)) {
        continue;
      }

      if (existingText.includes(title.toLowerCase())) {
        continue;
      }

      const card = document.createElement("article");
      card.style.cssText =
        "background:#172e3e;color:white;padding:20px;" +
        "border:1px solid #355466;border-radius:16px;" +
        "margin:12px 0;";

      const cardTitle = document.createElement("h3");
      cardTitle.textContent = title;
      card.appendChild(cardTitle);

      const body = document.createElement("p");
      body.textContent = String(item.body || "");
      card.appendChild(body);

      if (typeof item.url === "string" &&
          /^https?:\/\//i.test(item.url)) {
        const link = document.createElement("a");
        link.href = item.url;
        link.textContent = "Read more";
        link.style.color = "#a8dbc9";
        card.appendChild(link);
      }

      list.appendChild(card);
    }

    if (list.children.length === 0) return;

    const broadcastHeading = [...document.querySelectorAll("h1")]
      .find(h => h.textContent.includes("Broadcast Center"));

    if (broadcastHeading) {
      const container = broadcastHeading.closest("main");
      if (container) container.appendChild(section);
    }
  } catch (error) {
    console.error("Firestore display error:", error);
  }
}

displayCosmicAnnouncements();

