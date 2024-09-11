import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCXqr57FW3mLbV18-_YxcD0TZhoWRdzeYI",
  authDomain: "portfolio-zpz.firebaseapp.com",
  projectId: "portfolio-zpz",
  storageBucket: "portfolio-zpz.appspot.com",
  messagingSenderId: "382560172394",
  appId: "1:382560172394:web:2db635f44e02f54d3dcd13",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
