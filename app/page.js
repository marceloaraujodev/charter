'use client';

import { useRef, useState, useEffect } from 'react';
import HeroSectionImgLeft from '../components/HeroSectionImgLeft';
import HeroSectionImgRight from '../components/HeroSectionImgRight';
import c from './page.module.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import img6 from '../public/images/yacht-6.JPG';
import img82 from '../public/images/yacht-82.JPG';
import img81 from '../public/images/yacht-51.JPG';
import BackgroundImg from '../components/BackgroundImg';

export default function IndexPage() {
  const textRef = useRef();
  const { scrollYProgress, scrollY } = useScroll();

  const yText = useTransform(scrollY, [1, 400], [400, 980]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

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

      <div className={c.contentContainer}>

        <motion.div
          className={c.luxury}
          ref={textRef}
          initial={{ opacity: 0, y: -200}}
          animate={{opacity: 1, y: 400, transition: {durantion: 0.2}}}
          style={{ opacity: opacityText, y: yText}}
          // animate={animateOnce}
        >
          LUXURY
        </motion.div>

        
        <motion.div {...animationConfig} style={{ y: scrollYProgress }}>
          <HeroSectionImgLeft
            image={img82}
            title="Unforgettable Destinations"
            description="Embark on a journey to Miami, Florida Keys, or even the Bahamas on our Charter Yacht. Explore stunning coastlines, crystal-clear waters, and breathtaking sunsets in these iconic destinations."
          />
        </motion.div>

        <motion.div {...animationConfig} style={{ y: scrollYProgress }}>
          <HeroSectionImgRight
            image={img6}
            title="Luxurious Yacht Charter"
            description="Indulge in the ultimate experience of luxury and relaxation with our Charter Yacht. Our yacht is equipped with top-notch amenities and a professional crew to cater to your every need."
          />
        </motion.div>

        <motion.div {...animationConfig} style={{ y: scrollYProgress }}>
          <HeroSectionImgLeft
            image={img81}
            title="Entertainment Extravaganza"
            description="Unwind in style in our entertainment area, boasting a lavish jacuzzi where you can soak away your worries under the sun-kissed sky. Feel the thrill as you zip across the waves on our two high-performance jet skis, offering an exhilarating ride amidst the azure waters."
          />
        </motion.div>


      </div>
    </>
  );
}

