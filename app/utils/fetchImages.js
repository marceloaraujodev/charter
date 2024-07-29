import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

/* 
  1 npm firebase 
  2 initialzeApp
  3 call getStorage 
  4 create ref for storage
  5 create ref for images
  6 

*/

// Initialize Firebase
initializeApp(firebaseConfig);
const storage = getStorage();
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

 export default async function fetchImages() {
    try {
      const storageRef = ref(storage, storageBucket);
      const urlsRefArray = (await listAll(storageRef)).items;

      const absoluteUrl = urlsRefArray.map((url) => {
        return getDownloadURL(url);
      });
      const urls = await Promise.all(absoluteUrl);
      return urls;

    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  };




