'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import yachtImages from '@/imageImports';
import c from './GalleryModal.module.css';

export default function ModalImage({
  isOpen,
  selectedImage,
  onClose,
  initialIndex,
  imagesUrl
}) {
  
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  function handleArrowClick(direction) {
    if (direction === 'right') {
      // last element in the array
      if (currentIndex >= imagesUrl.length - 1) {
        setCurrentIndex((prevIndex) => {
          prevIndex = 0;
          return 0;
        });
      } else {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }

    if (direction === 'left') {
      if (currentIndex <= 0) {
        setCurrentIndex((prevIndex) => {
          prevIndex = imagesUrl.length - 1;
          const newIndex = imagesUrl.length - 1;
          return newIndex;
        });
      } else {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }
    }
  }

  return (
    <>
      {isOpen && (
        <div className={c.modalContainer}>
          <div className={c.modalContent}>
            <div className={c.x}>
              <Image
                className={c.modalImg}
                src={imagesUrl[currentIndex]}
                alt="enlarged img"
                width={800}
                height={500}
                style={{ objectFit: 'contain', maxHeight: '600px' }}
              />
            <div className={c.modalControls}>
              <button className={c.btnClose} onClick={onClose}>
                X
              </button>
              <div
                className={c.leftArrow}
                onClick={() => handleArrowClick('left')}
              >
                <i className="bi bi-arrow-left"></i>
              </div>
              <div
                className={c.righttArrow}
                onClick={() => handleArrowClick('right')}
              >
                <i className="bi bi-arrow-right"></i>
              </div>
            </div>
            </div>
          </div>
          <div className={c.modalBackground} onClick={onClose}></div>
        </div>
      )}
    </>
  );
}
