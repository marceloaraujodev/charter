'use client';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import yachtImages from '@/imageImports';
import c from './GalleryModal.module.css'

export default function ModalImage({isOpen, selectedImage, onClose, initialIndex}) {
  const imgArray = Object.values(yachtImages); // imgArray[index] is the object for the src
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [srcObject, setSrcObject] = useState(imgArray[initialIndex]);

  function handleArrowClick(direction){
    
    if(direction === 'right'){
      
      if(currentIndex >= imgArray.length -1){
        setCurrentIndex(prevIndex => {
          prevIndex = 0;
          setSrcObject(imgArray[0])
          return 0
        })
      }else{
        setCurrentIndex(prevIndex => prevIndex + 1)
        setSrcObject(imgArray[currentIndex + 1])
      }
    }

    if(direction === 'left'){
      if(currentIndex <= 0){
        setCurrentIndex(prevIndex => {
          const newIndex = imgArray.length -1;
          setSrcObject(imgArray[newIndex])
          return newIndex
        })
      }else{
        setCurrentIndex(prevIndex => prevIndex -1);
        setSrcObject(imgArray[currentIndex -1])
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
        src={srcObject}
        alt='enlarged img'
        width={800}
        style={{objectFit: "contain", maxHeight: '600px'}}
        />
        </div>
        <button className={c.btnClose} onClick={onClose}>X</button>
        <div className={c.leftArrow} onClick={() => handleArrowClick('left')}><i className="bi bi-arrow-left"></i></div>
        <div className={c.righttArrow} onClick={() => handleArrowClick('right')}><i className="bi bi-arrow-right"></i></div>
      </div>
      <div className={c.modalBackground} onClick={onClose}></div>
    </div>
    )}
    </>
  )
}
