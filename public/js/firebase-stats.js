// Firebase Statistics - Safe CCTV
// Menggunakan Firebase v10.7.1 dengan metode yang tidak deprecated

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue, get, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQg_DHBrxUqjbXyUoAFPWAIQuNZAD9wGs",
  authDomain: "safe-cctv-blog-post-like.firebaseapp.com",
  databaseURL: "https://safe-cctv-blog-post-like-default-rtdb.firebaseio.com",
  projectId: "safe-cctv-blog-post-like",
  storageBucket: "safe-cctv-blog-post-like.appspot.com",
  messagingSenderId: "985469144384",
  appId: "1:985469144384:web:653bf30ebc78239690bea5",
  measurementId: "G-DLGXGKW7WK"
};

// Inisialisasi Firebase dengan error handling
try {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  // Counter views global
  const siteViewsRef = ref(db, 'site_stats/views');
  
  // Update views dengan metode yang lebih stabil
  const updateViews = async () => {
    try {
      const snapshot = await get(siteViewsRef);
      const currentViews = snapshot.val() || 0;
      await set(siteViewsRef, currentViews + 1);
    } catch (error) {
      console.warn('Error updating views:', error);
    }
  };
  
  updateViews();
  
  // Listen untuk perubahan views
  onValue(siteViewsRef, (snapshot) => {
    const viewsEl = document.getElementById("firebase_site_views");
    if (viewsEl) {
      const count = snapshot.val() ?? 0;
      viewsEl.textContent = count.toString();
    }
  }, (error) => {
    console.warn('Error reading views:', error);
  });

  // Counter unique visitors global
  const siteVisitorsRef = ref(db, 'site_stats/visitors');
  const visitorKey = 'firebase-unique-visitor';
  
  // Update visitors hanya jika belum pernah dikunjungi
  if (!localStorage.getItem(visitorKey)) {
    const updateVisitors = async () => {
      try {
        const snapshot = await get(siteVisitorsRef);
        const currentVisitors = snapshot.val() || 0;
        await set(siteVisitorsRef, currentVisitors + 1);
        localStorage.setItem(visitorKey, 'true');
      } catch (error) {
        console.warn('Error updating visitors:', error);
      }
    };
    
    updateVisitors();
  }
  
  // Listen untuk perubahan visitors
  onValue(siteVisitorsRef, (snapshot) => {
    const visitorEl = document.getElementById("firebase_site_visitors");
    if (visitorEl) {
      const count = snapshot.val() ?? 0;
      visitorEl.textContent = count.toString();
    }
  }, (error) => {
    console.warn('Error reading visitors:', error);
  });
  
} catch (error) {
  console.warn('Firebase initialization error:', error);
} 