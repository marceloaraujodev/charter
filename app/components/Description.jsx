import React from 'react';
import Image from 'next/image';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import Title from './Title';
import image6 from '@/public/images/yacht-6.JPG';
import Button from './Button';
import c from './Description.module.css';

export default function Description({ title, description, image }) {
  const imgRef = useRef();
  const descriptionRef = useRef();
  const router = useRouter();

  const animationConfig = {
    initial: { x: 100, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: true },
  };

  return (
    <div className={c.row}>
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

      <div className={c.container}>
        <motion.div
          className={c.left}
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          ref={descriptionRef}>
          <Title title={title} />
          <p>{description}</p>
          <Button onClick={() => router.push('/details')}>Read More</Button>
        </motion.div>

        <motion.div className={c.right} {...animationConfig} ref={imgRef}>
          <Image
            className={c.img}
            src={image}
            alt="Hero Section Image"
            width="auto"
            height="auto"
          />
        </motion.div>
      </div>
    </div>
  );
}
