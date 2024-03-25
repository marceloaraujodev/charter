import React from 'react';
import Image from 'next/image';
import c from './page.module.css';
import {promises as fs } from 'fs';
import path from 'path';

async function Gallery() {
  // const imageDir =  path.join(process.cwd(), '/public/images')
  // console.log(imageDir)
  // const files = await fs.readdir(imageDir, (err, file) => {
  //   // console.log(file)
  //   return files
  // });
  // files.map((file) => {
  //   // import file from imageDir
  //   console.log(`import ${file} from '/public/images/${file}`)
  //   return `import ${file} from ${imageDir}/${file}`
  // })

  // console.log(files)
 
  return (
    <>
      <h1 className={c.test}>Gallery</h1>
      {/* <div className={c.photoGrid}>
        {images.map((image) => (
          <div key={image} className={c.gridItem}>
            <Image src={image} width={400} height={400} alt={image.split('/').pop()} />
          </div>
        ))}
      </div> */}
    </>
  );
}

export default Gallery;