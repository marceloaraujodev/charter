import firebaseInit from "./firebaseInit";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

export default async function uploadImages(file){
  firebaseInit();
  
  const storage = getStorage();
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  const storageRef = ref(storage, storageBucket);

  const uploadImage = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadImage.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done.`);
    }, reject, () => {
      getDownloadURL(uploadImage.snapshot.ref)
       .then((downloadURL) => {
          resolve(downloadURL);
        })
       .catch((error) => {
          reject(error);
        });
    });
  })

}