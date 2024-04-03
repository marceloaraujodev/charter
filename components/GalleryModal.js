import React from 'react'
import Image from 'next/image';
import c from './GalleryModal.module.css'

export default function ModalImage({isOpen, selectedImage, onClose}) {
  return (
    <>
    {isOpen && (
      <div className={c.modalContainer}>
      <div className={c.modalContent}>
      <div className={c.position}>
      </div>
        <Image 
        src={selectedImage}
        width={600}
        height={400}
        alt='enlarged img'
        objectFit='cover'
        />
        <button className={c.btnClose} onClick={onClose}>X</button>
        
      </div>
      <div className={c.modalBackground} onClick={onClose}></div>
    </div>
    )}
    </>
  )
}
