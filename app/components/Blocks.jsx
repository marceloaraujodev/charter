import React from 'react'
import Image from 'next/image';
import image6 from '@/public/images/yacht-6.JPG'
import img81 from '@/public/images/yacht-2.JPG';
import c from './Blocks.module.css';
import Button from './Button';
import Title from './Title';
import { motion } from 'framer-motion';
import { useRef } from 'react';

export default function Blocks() {
  const imgRef = useRef();
  const descriptionRef = useRef();

  const animationConfig = {
    initial: { x: 100, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: true },
  };
  return (
    <>
    <div className={c.row}>

      <div className={c.block}>
        <motion.div 
          className={c.left}
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3}}
          viewport={{ once: true }}
        >          
          <Image
            src={image6}
            width='auto'
            height='auto'
            alt='blockImg'
              />
          </motion.div>
        <motion.div 
          className={c.right}
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4}}
          viewport={{ once: true }}
        >
          <Title 
            title='LUXURY YACHT RENTALS & EVENTS'
          />
          <p>Headquartered in Miami, Florida, we offer a wide variety of boats and event planning services including luxury yacht rentals, yacht charters, party boat rentals, speed boat rentals, yacht weddings</p>
          <div>
          <Button classname={c.btn}>Read More</Button>
        </div>
        </motion.div>
      </div>
    </div>

    <div className={c.row}>

    <div className={`${c.block} ${c.reverseBlock}`}>
        <motion.div 
          className={`${c.right} ${c.rightBackground}`}
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5}}
          viewport={{ once: true }}  
        >          
          <Title 
            title='LUXURY YACHT RENTALS & EVENTS'
            colorClass='white'
          />
          <p>Headquartered in Miami, Florida, we offer a wide variety of boats and event planning services including luxury yacht rentals, yacht charters, party boat rentals, speed boat rentals, yacht weddings</p>
        <div>
          <Button classname={c.btn}>Read More</Button>
        </div>
        </motion.div>
        <motion.div 
          className={c.left}
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6}}
          viewport={{ once: true }}   
        >
          <Image
            src={img81}
            width='auto'
            height='auto'
            alt='blockImg'
              />
        </motion.div>
      </div>
    </div>
    </>
  )
}
