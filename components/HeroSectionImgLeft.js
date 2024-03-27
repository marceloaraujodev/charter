import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import c from './HeroSectionImgLeft.module.css';
import Image from 'next/image';


export default function HeroSectionImgLeft({title, description, image}) {
  const imgRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();

  const animationConfig = {
    initial: { x: -100, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: {once: true}
  }

  return (
     <div className={c.container}>
      <div className={c.contentContainer}>
        <div className={c.heroRow}>
          <motion.div className={c.left} 
            initial={{ x: -100, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            transition={{duration: 0.4}}
            viewport={{once: true}}
            ref={imgRef}
          >
            <Image
              className={c.img}
              src={image}
              alt="Hero Section Image"
              width={500}
              height={300}
            />
          </motion.div>
          <div className={c.right}>
            <motion.div 
              className={c.title} 
              {...animationConfig}
              ref={titleRef}
            >{title}</motion.div>

            <motion.div 
              {...animationConfig}
              ref={descriptionRef}
              className={c.description}>
              {description}
            </motion.div>
          </div>
        </div>
      </div>
      </div>
  );
}
