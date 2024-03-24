import React from 'react'
import Image from 'next/image';
import img6 from '../../public/images/yacht-6.JPG';
import img82 from '../../public/images/yacht-82.JPG';
import img81 from '../../public/images/yacht-51.JPG';
import c from './page.module.css'

const images = Array.from({ length: 3}, (_, index) => ({
  id: index + 1,
  src: `/public/images/yacht-${index + 10}.JPG`,
  imgName: `yacth-${index + 1}.JPG`
}))

console.log(images)

export default function gallery() {
  return (
    <>
    <h1 className={c.test}>gallery</h1>
    <div className={c.photoGrid}>
      {/* <div className={c.gridItem}><Image src={img82} width={400} alt='ts' /></div>
      <div className={c.gridItem}><Image src={img81} width={400} alt='ts' /></div>
      <div className={c.gridItem}><Image src={img82} width={400} alt='ts' /></div>
      <div className={c.gridItem}><Image src={img81} width={400} alt='ts' /></div>
      <div className={c.gridItem}><Image src={img82} width={400} alt='ts' /></div>
      <div className={c.gridItem}><Image src={img81} width={400} alt='ts' /></div> */}
      {images.map((image) => (
        <div key={image.id} className={c.gridItem}>
            <Image src={`/public/images/${image.imgName}`} width={400} height={400} alt={`Image ${image.id}`} />
          </div>
      ))} 

    </div>
    </>
  )
}
