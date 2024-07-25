import React from 'react'
import Card from './Card';
import Image from 'next/image';
import boat from '@/public/images/2.jpg';
import image6 from '@/public/images/yacht-6.JPG'
import img47 from '@/public/images/yacht-47.JPG'
import img81 from '@/public/images/yacht-51.JPG';
import img12 from '@/public/images/yacht-12.JPG';
import c from './HeroSection2.module.css'


export default function HeroSection2() {
  return (

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
      
      <div className={c.contentContainer} >
        <section className={c.section}>
          <Card
            title='Unparalleled Privacy'
            description="Experience the ultimate escape from the world. Our yachts offer exclusive privacy, ensuring you enjoy your time with complete discretion and serenity."
            image={img12}
          />
        </section>
        <section className={c.section}>
          <Card
            title='Luxurious Entertainment'
            description="Indulge in world-class entertainment on the high seas. From live music to private screenings, our yachts are equipped to provide endless enjoyment."
            image={img81}
          />
        </section>
        <section className={c.section}>
          <Card
            title='Supreme Comfort'
            description="Relax in unmatched comfort. Our yachts boast plush interiors and state-of-the-art amenities, guaranteeing a restful and rejuvenating voyage."
            image={img47}
          />
        </section>
      </div>
  </div>

  )
}
