import { useState, useEffect } from 'react';
import Button from '@/app/components/Button';
import Image from 'next/image';
import img from '@/public/images/main.JPG';
import fetchImages from '@/app/utils/fetchImages';
import {
  getStorage,
  ref,
  getDownloadURL,
  listAll,
  deleteObject,
} from 'firebase/storage';
import Uploads from './uploads/Uploads';
import c from './GallerySettings.module.css';


const storage = getStorage();
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const storageRef = ref(storage, storageBucket);


export default function GallerySettings() {
  const [pictures, setPictures] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      const urls = await fetchImages();
      setPictures(urls);
    };
    getImages();
  }, [isUploading]);

  async function handleDelete(img) {
    const parts = img.split('/');
    const fileName = parts[parts.length - 1].split('?')[0];

    // Create a reference to the file to delete
    const desertRef = ref(storageRef, fileName);
    console.log(desertRef)

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        console.log('file deleted successfully');
        setPictures((prevPictures) => prevPictures.filter((picture) => picture !== img));
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log('Something went wrong deleting the file')
      });
  }
  return (
    <div className={c.container}>
      <div></div>

      {isUploading ? (
        <Uploads setIsUploading={setIsUploading} />
      ) : 
      (<>
        <Button
          className={c.btn}
          onClick={() => setIsUploading(true)}
         >
          Add
        </Button>
        {pictures.map((picture) => {
          return (
            <div className={c.row} key={picture}>
              <div className={c.pictureContainer}>
                <Image
                  src={picture}
                  className={c.picture}
                  alt="img"
                  height={100}
                  width={150}
                />
              </div>
              <div className={c.btnContainer}>
                <Button
                  color="red"
                  className={c.btn}
                  onClick={() => handleDelete(picture)}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </>)
      }
      
    </div>
  );
}
