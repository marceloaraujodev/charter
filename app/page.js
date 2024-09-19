'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import img6 from '../public/images/yacht-6.JPG';
import img82 from '../public/images/yacht-82.JPG';
import img81 from '../public/images/yacht-51.JPG';
import img19 from '@/public/images/yacht-19.JPG';
import img12 from '@/public/images/yacht-12.JPG';
import imgSunset from '@/public/images/sunset.jpg';
import BackgroundImg from './components/BackgroundImg';
import Card from '@/app/components/Card';
import Description from '@/app/components/Description';
import Blocks from '@/app/components/Blocks';
import c from './page.module.css';
import HeroSection2 from '@/app/components/HeroSection2';

export default function IndexPage() {
  const textRef = useRef();
  const confortRef = useRef();
  const { scrollYProgress, scrollY } = useScroll();


  const yText = useTransform(scrollY, [1, 323], [323, 980]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  const yConfort = useTransform(
    scrollY,
    [1000, 1600, 1800, 2100, 2200], [0, 350, 350, 800, 900]
    // [900, 1200, 1500, 1600, 2000],
    // [0, 250, 250, 250, 913]
  );
  const opacityConfort = useTransform(
    scrollY,
    [1, 1800, 1800, 2300], [0, 1, 1, 0]
    // [700, 1300, 1600, 2160], [0, 1, 1, 0]
  );
  const animationConfig = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1, transition: { duration: 1.7 } },
  };

  function formatPhoneNumber(number) {
    // console.log(number?.substring(0, 1))
    const formattedNumber = `(${number.substring(0, 3)}) ${number.substring(3, 6)}-${number.substring(6, 10)}`;
    return formattedNumber;
  }
//  console.log(formatPhoneNumber('1111112233'))
  return (
    <>
    <div>
      <BackgroundImg className={`IndexPage`} />
    </div>
      <div className={c.container}>
        <div className={c.contentContainer}>
          <motion.div
            className={c.luxury}
            ref={textRef}
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 323, transition: { durantion: 0.8 } }}
            style={{ opacity: opacityText, y: yText }}
            // animate={animateOnce}
          >
            LUXURY
          </motion.div>
          <Description
            title="Bahamas Escape"
            description="Discover the Bahamas in style aboard our luxurious yacht. Glide through crystal-clear waters, explore secluded islands, and relax on sun-kissed beaches. Enjoy bespoke experiences, including snorkeling in vibrant coral reefs and savoring gourmet meals, as you embrace the ultimate tropical getaway. Weekly packages available."
            image={img19}
            identifier='corporate'
          />

          <div className={c.confortContainer}>
            <motion.div
              className={c.confort}
              style={{ opacity: opacityConfort, y: yConfort }}
              ref={confortRef}
            >
              COMFORT
            </motion.div>
          </div>
          <BackgroundImg className={`view`} />
          <Description
            title="Thrill of the Open Sea"
            description="Discover the thrill of cruising through the water on our sleek yacht. With every turn and wave, experience the exhilaration of movement and the joy of an unrestricted adventure. Revel in the pure excitement of the open sea and the freedom it offers."
            image={img12}
            identifier='opensea'
          />

          <Blocks />
          <Description
            title="Sunsets & Dates"
            description="Create unforgettable moments aboard our luxurious yacht. Enjoy romantic sunsets, intimate dinners, and enchanting dates with Miami's stunning skyline as your backdrop. Indulge in a serene escape and make memories to last a lifetime."
            image={imgSunset}
            identifier='sunset'
          />

          <HeroSection2 />
        </div>
      </div>
    </>
  );
}
