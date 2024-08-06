// import {useState} from 'react';
'use client';
import Image from 'next/image';
import c from './page.module.css';
import yachtImages from '@/imageImports';
import { useState, useEffect } from 'react';
import ModalImage from '@/app/components/GalleryModal';
import fetchImages from '../utils/fetchImages';
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

function Gallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [initialIndex, setInitialIndex] = useState(null);
  const [imagesUrl, setImagesUrl] = useState();

    useEffect(() => {
    const getImages = async () => {
      const urls = await fetchImages();
      setImagesUrl(urls);
    }
    getImages();
  }, []);

  const onClose = () => setIsOpen(false);

  return (
    <>
      <div className="container">
        <div className={c.photoGrid}>
          {imagesUrl ? (
            imagesUrl.map((imgURL, index) => (
              <div key={index} className={c.gridItem}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedImage(imagesUrl[index]);
                    setIsOpen(true);
                    setInitialIndex(index);
                  }}
                >
                  <div className={c.imgWrapper}>
                    <Image
                      className={c.x}
                      src={imgURL}
                      width={300}
                      height={169}
                      alt={'gallery image'}
                      // style={{
                      //   objectFit: 'cover',
                      //   maxHeight: '169px',
                      //   // height: 'auto',
                      //   // width: 'auto'
                      // }}
                    />
                  </div>
                </a>
              </div>
            ))
          ) : (
            <p className={c.loading}>Loading Images...</p>
          )}

          {/* {Object.keys(yachtImages).map((imageName, index) => (
            <div key={index} className={c.gridItem}>
              <a href='#' onClick={() => { 
                setSelectedImage(yachtImages[imageName]); 
                setIsOpen(true); 
                setInitialIndex(index)
                }}>
                <div className={c.imgBorder}>
                <Image
                  className={c.x}
                  src={yachtImages[imageName]}
                  width={300}
                  alt={'gallery image'}
              />
              </div>
              </a>
            </div>
          ))} */}
        </div>
      </div>
      {isOpen && (
        <ModalImage
          isOpen={isOpen}
          selectedImage={selectedImage}
          onClose={onClose}
          initialIndex={initialIndex}
          imagesUrl={imagesUrl} 
        />
      )}
    </>
  );
}

export default Gallery;
