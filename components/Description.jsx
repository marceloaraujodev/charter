import React from 'react'
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import image6 from '../public/images/yacht-6.JPG'
import Button from './Button';
import c from './Description.module.css';

export default function Description({title, description, image}) {

  const imgRef = useRef();
  const descriptionRef = useRef();

  const animationConfig = {
    initial: { x: 100, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: {once: true}
  }

  return (
    <div className={c.row}>
      <div className={c.container}>
        <motion.div 
            className={c.left}
            initial={{ x: -100, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            transition={{duration: 0.3}}
            viewport={{once: true}}
            ref={descriptionRef}
         >
            <h2>
            {title}
            </h2>
          <p>
            {description}
          </p>
          <Button>Read More</Button>
        </motion.div>

        <motion.div 
          className={c.right}
          {...animationConfig}
          ref={imgRef}
          >
          <Image
                  className={c.img}
                  src={image}
                  alt="Hero Section Image"
                  width='auto'
                  height='auto'
          />
        </motion.div>
      </div>
  </div>
  )
}
