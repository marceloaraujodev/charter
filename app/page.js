'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import img6 from '../public/images/yacht-6.JPG';
import img82 from '../public/images/yacht-82.JPG';
import img81 from '../public/images/yacht-51.JPG';
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
  // console.log(scrollY)

  const yText = useTransform(scrollY, [1, 300], [300, 980]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    if (confortRef.current) {
      const top = confortRef.current.getBoundingClientRect().top + window.scrollY;
      setConfortTop(top);
      console.log("Confort container top position:", top);
    }
  }, []);

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

  return (
    <>
      <BackgroundImg className={`IndexPage`} />
      <div className={c.container}>
        <div className={c.contentContainer}>
          <motion.div
            className={c.luxury}
            ref={textRef}
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 300, transition: { durantion: 0.8 } }}
            style={{ opacity: opacityText, y: yText }}
            // animate={animateOnce}
          >
            LUXURY
          </motion.div>
          <Description
            title="Corporate Charters & Events"
            description="Corporate Dinners, Cocktail Cruises, Office Parties, Team Building, Watersports Adventures, Sailing Regattas & more."
            image={img82}
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
            title="Corporate Charters & Events"
            description="Corporate Dinners, Cocktail Cruises, Office Parties, Team Building, Watersports Adventures, Sailing Regattas & more."
            image={img82}
          />

          <Blocks />
          <Description
            title="Sunset Dates & Fun"
            description="Corporate Dinners, Cocktail Cruises, Office Parties, Team Building, Watersports Adventures, Sailing Regattas & more."
            image={img82}
          />

          <HeroSection2 />
        </div>
      </div>
    </>
  );
}
