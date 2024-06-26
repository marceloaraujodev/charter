'use client';
import { useRef, useState, useEffect } from 'react';
import HeroSectionImgLeft from '../components/HeroSectionImgLeft';
import HeroSectionImgRight from '../components/HeroSectionImgRight';
import { motion, useScroll, useTransform } from 'framer-motion';
import img6 from '../public/images/yacht-6.JPG';
import img82 from '../public/images/yacht-82.JPG';
import img81 from '../public/images/yacht-51.JPG';
import BackgroundImg from '../components/BackgroundImg';
import Card from '@/components/Card';
import Description from '@/components/Description';
import Blocks from '@/components/Blocks';
import c from './page.module.css';
import HeroSection2 from '@/components/HeroSection2';

export default function IndexPage() {
  const textRef = useRef();
  const confortRef = useRef();
  const { scrollYProgress, scrollY } = useScroll();
  // console.log(scrollY)

  const yText = useTransform(scrollY, [1, 400], [400, 980]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  const yConfort = useTransform(
    scrollY,
    [900, 1200, 1500, 1600, 2000],
    [0, 250, 250, 250, 913]
  );
  const opacityConfort = useTransform(
    scrollY,
    [760, 1300, 1600, 2160],
    [0, 1, 1, 0]
  );
  const animationConfig = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1, transition: { duration: 1.7 } },
  };

  // let animationOnce = {}
  // const [animateOnce, setAnimateOnce] = useState(animationOnce.initial);

  // useEffect(() => {
  //   setAnimateOnce({
  //     opacity: 1,
  //     y: 400,
  //     transition: {durantion: 0.2}
  //   })
  // }, [])



  return (
    <>

      <BackgroundImg className={`IndexPage`} />
      <div className={c.container}>
        <div className={c.contentContainer}>
          <motion.div
            className={c.luxury}
            ref={textRef}
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 400, transition: { durantion: 0.2 } }}
            style={{ opacity: opacityText, y: yText }}
            // animate={animateOnce}
          >
            LUXURY
          </motion.div>
          <Description 
            title='Corporate Charters & Events'
            description='Corporate Dinners, Cocktail Cruises, Office Parties, Team Building, Watersports Adventures, Sailing Regattas & more.'
            image={img82}
          />
          {/* <motion.div {...animationConfig} style={{ y: scrollYProgress }}>
            <HeroSectionImgLeft
              image={img82}
              title="Unforgettable Destinations"
              description="Embark on a journey to Miami, Florida Keys, or even the Bahamas on our Charter Yacht. Explore stunning coastlines, crystal-clear waters, and breathtaking sunsets in these iconic destinations."
            />
          </motion.div> */}

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
            title='Corporate Charters & Events'
            description='Corporate Dinners, Cocktail Cruises, Office Parties, Team Building, Watersports Adventures, Sailing Regattas & more.'
            image={img82}
          />

          <Blocks />
          <Description 
            title='Corporate Charters & Events'
            description='Corporate Dinners, Cocktail Cruises, Office Parties, Team Building, Watersports Adventures, Sailing Regattas & more.'
            image={img82}
          />

          <HeroSection2 />
        </div>
      </div>
    </>
  );
}
