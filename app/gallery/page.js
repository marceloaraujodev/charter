import React from 'react';
import Image from 'next/image';
import c from './page.module.css';
import {promises as fs } from 'fs';
import path from 'path';
import yachtImages from '@/imageImports';

async function Gallery() {

  const maxLoops = 5;
  let loopCount = 0;
  
  
  for (const [key] of Object.entries(yachtImages)){
    // console.log(key)
    loopCount ++;

    if(loopCount >= maxLoops){
      break;
    }
  }

  // const t = Object.keys(yachtImages);
  // console.log(t)
  // console.log(`${yachtImages.yacht10}`)

  return (
    <>

      <div className={c.photoGrid}>

        {Object.keys(yachtImages).map((imageName, index) => 
          (<div key={index} className={c.gridItem}>
            <Image src={yachtImages[imageName]} width={300} alt={'gallery image'}/>
          </div>)
        )}
  
          {/* <div  className={c.gridItem}>
            <Image src={yachtImages.yacht12} width={400} height={400} alt={'es'} />
          </div>
          <div  className={c.gridItem}>
            <Image src={yachtImages.yacht12} width={400} height={400} alt={'es'} />
          </div>
          <div  className={c.gridItem}>
            <Image src={yachtImages.yacht12} width={400} height={400} alt={'es'} />
          </div>
          <div  className={c.gridItem}>
            <Image src={yachtImages.yacht12} width={400} height={400} alt={'es'} />
          </div> */}

      </div>
    </>
  );
}

export default Gallery;