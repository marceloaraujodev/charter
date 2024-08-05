import firebaseInit from "./firebaseInit";
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';

firebaseInit();
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




