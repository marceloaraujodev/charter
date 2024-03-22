import React from 'react';
import HeroSectionImgLeft from './HeroSectionImgLeft';
import HeroSectionImgRight from './HeroSectionImgRight';
import Reviews from './Reviews';
import HeroSection2 from './HeroSection2';
import c from './Content.module.css';
import { motion, useScroll, useSpring} from 'framer-motion';
import img6 from '../public/images/yacht-6.JPG';
import img82 from '../public/images/yacht-82.JPG';
import img81 from '../public/images/yacht-51.JPG';

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
          <HeroSectionImgLeft
            image={img82}
            title='Unforgettable Destinations'
            description='Embark on a journey to Miami, Florida Keys, or even the Bahamas on our Charter Yacht. Explore stunning coastlines, crystal-clear waters, and breathtaking sunsets in these iconic destinations.'
           />
      </motion.div>

      <motion.div
        {...animationConfig}
        style={{ y: scrollYProgress }}
      >
        <HeroSectionImgRight 
          image={img6}
          title='Luxurious Yacht Charter'
          description='Indulge in the ultimate experience of luxury and relaxation with our Charter Yacht. Our yacht is equipped with top-notch amenities and a professional crew to cater to your every need.'
         />
      </motion.div>

      <motion.div
        {...animationConfig}
        style={{ y: scrollYProgress }}
      >
          <HeroSectionImgLeft
            image={img81}
            title='Entertainment Extravaganza'
            description='Unwind in style in our entertainment area, boasting a lavish jacuzzi where you can soak away your worries under the sun-kissed sky. Feel the thrill as you zip across the waves on our two high-performance jet skis, offering an exhilarating ride amidst the azure waters.'
           />
      </motion.div>

      {/* <motion.div
        {...animationConfig}
        style={{ y: scrollYProgress }}
      >
        <HeroSection2 />
      </motion.div> */}

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

