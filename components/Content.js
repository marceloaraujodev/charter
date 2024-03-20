import React from 'react';
import HeroSectionImgLeft from './HeroSectionImgLeft';
import HeroSectionImgRight from './HeroSectionImgRight';
import Reviews from './Reviews';
import HeroSection2 from './HeroSection2';
import c from './Content.module.css';

export default function Content() {
  return (
    <>
      <div className={c.contentContainer}>
      <HeroSectionImgLeft />
      <HeroSectionImgRight />
      <HeroSection2 />
      <Reviews />
      </div>
    </>
  );
}
