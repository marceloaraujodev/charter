import React from 'react';
import HeroSectionImgLeft from './HeroSectionImgLeft';
import HeroSectionImgRight from './HeroSectionImgRight';
import Reviews from './Reviews';
import HeroSection2 from './HeroSection2';
import c from './Content.module.css';
import { motion, useScroll, useSpring} from 'framer-motion';


export default function Content() {
  const { scrollYProgress } = useScroll();

  const animationConfig = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1, transition: { duration: 1.7 } },
  };

  return (
    <>
      <div className={c.contentContainer}>
      <motion.div
        {...animationConfig}
        style={{ y: scrollYProgress }}
      >
          <HeroSectionImgLeft />
      </motion.div>

      <motion.div
        {...animationConfig}
        style={{ y: scrollYProgress }}
      >
        <HeroSectionImgRight />
      </motion.div>

      <motion.div
        {...animationConfig}
        style={{ y: scrollYProgress }}
      >
        <HeroSection2 />
      </motion.div>

      <motion.div
        {...animationConfig}
        style={{ y: scrollYProgress }}
      >
        <Reviews />
      </motion.div>
      </div>
    </>
  );
}

