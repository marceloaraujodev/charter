// import {useState} from 'react';
'use client'
import Image from 'next/image';
import c from './page.module.css';
import yachtImages from '@/imageImports';
import { useState, useEffect } from 'react';
import ModalImage from '@/components/GalleryModal';
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAPPvRPTN95o-egb8URn1JTh-qoqMdMK7M",
  authDomain: "charter-8fd79.firebaseapp.com",
  projectId: "charter-8fd79",
  storageBucket: "charter-8fd79.appspot.com",
  messagingSenderId: "677978965813",
  appId: "1:677978965813:web:a6fb3e527489db51a9ae7c",
  measurementId: "G-P28GW84F4F"
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
const storage = getStorage()


function Gallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [initialIndex, setInitialIndex] = useState(null);
  const [imagesUrl, setImagesUrl] = useState();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storageRef = ref(storage, 'gs://charter-8fd79.appspot.com');
        const urlsRefArray = (await listAll(storageRef)).items
        const absoluteUrl = urlsRefArray.map((url) => {
          return getDownloadURL(url)
        })
        const urls = await Promise.all(absoluteUrl)
        setImagesUrl(urls)
        // console.log(urls)

      } catch (error) {
        
      }
    }
    fetchImages()
  }, [])

  const onClose = () => setIsOpen(false);

  return (
    <>
      <div className={c.container}>
        <div className={c.photoGrid}>
          {imagesUrl ? imagesUrl.map((imgURL, index) => (
            <div key={index} className={c.gridItem}>
              <a href='#' onClick={() => { 
                setSelectedImage(imagesUrl[index]); 
                setIsOpen(true); 
                setInitialIndex(index)
                }}>
                <div className={c.imgBorder}>
                <Image
                  className={c.x}
                  src={imgURL}
                  width={300}
                  height={200}
                  alt={'gallery image'}
                  style={{objectFit: "cover", maxHeight: '169px'}}
              />
              </div>
              </a>
            </div>
          )): <p className={c.loading}>Loading Images...</p>}

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
      {isOpen && <ModalImage 
      isOpen={isOpen} 
      selectedImage={selectedImage} 
      onClose={onClose} 
      initialIndex={initialIndex}
      />}
      
    </>
  );
}

export default Gallery;
