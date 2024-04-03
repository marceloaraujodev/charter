// import {useState} from 'react';
'use client'
import Image from 'next/image';
import c from './page.module.css';
import yachtImages from '@/imageImports';
import { useState } from 'react';
import ModalImage from '@/components/GalleryModal';

function Gallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const onClose = () => setIsOpen(false);

  return (
    <>
      <div className={c.container}>
        <div className={c.photoGrid}>
          {Object.keys(yachtImages).map((imageName, index) => (
            <div key={index} className={c.gridItem}>
              <a href='#' onClick={() => { 
                setSelectedImage(yachtImages[imageName]); 
                setIsOpen(true); 
                }}>
                <Image
                  src={yachtImages[imageName]}
                  width={300}
                  alt={'gallery image'}
              />
              </a>
            </div>
          ))}
        </div>
      </div>
      {isOpen && <ModalImage isOpen={isOpen} selectedImage={selectedImage} onClose={onClose} />}
    </>
  );
}

export default Gallery;
