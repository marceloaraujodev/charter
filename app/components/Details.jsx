'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
// import { useRef } from 'react';
import Image from 'next/image';
import image6 from '@/public/images/yacht-6.JPG'
import Title from './Title';
import c from './Details.module.css';
export default function Details() {
  // const imgRef = useRef();
  // const descriptionRef = useRef();

  // const animationConfig = {
  //   initial: { x: 100, opacity: 0 },
  //   whileInView: { x: 0, opacity: 1 },
  //   viewport: { once: true },
  // };
  return (
    <>

    <div className={c.container}>

    <div className={c.waveContainer}>
        <div className={c.wave}>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className={c.shapeFill}></path>
          </svg>
        </div>

      </div>

      <div className={c.row}>
        <div className={c.block}>


          <motion.div
            className={c.right}
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            viewport={{ once: true }}
           >
            <h2>LUXURY YACHT RENTALS & EVENTS</h2>
            <p>
              Headquartered in Miami, Florida, we offer a wide variety of boats
              and event planning services including luxury yacht rentals, yacht
              charters, party boat rentals, speed boat rentals, yacht weddings
            </p>
            <div>
              <Button classname={c.btn}>Read More</Button>
            </div>
          </motion.div>

          <motion.div
            className={c.left}
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
           >
            <Image src={image6} width="auto" height="auto" alt="blockImg" />
          </motion.div>
        </div>
      </div>

    <Title title='text' />
    </div>

      {/* <div className={c.row}>
        <div className={`${c.block} ${c.reverseBlock}`}>
          <motion.div
            className={`${c.right} ${c.rightBackground}`}
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>LUXURY YACHT RENTALS & EVENTS</h2>
            <p>
              Headquartered in Miami, Florida, we offer a wide variety of boats
              and event planning services including luxury yacht rentals, yacht
              charters, party boat rentals, speed boat rentals, yacht weddings
            </p>
            <div>
              <Button classname={c.btn}>Read More</Button>
            </div>
          </motion.div>
          <motion.div
            className={c.left}
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Image src={img81} width="auto" height="auto" alt="blockImg" />
          </motion.div>
        </div>
      </div> */}
    </>
  );
}
