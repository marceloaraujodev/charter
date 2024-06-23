import React from 'react'
import Card from './Card';
import Image from 'next/image';
import boat from '../public/images/2.jpg';
import image6 from '../public/images/yacht-6.JPG'
import img81 from '../public/images/yacht-51.JPG';
import c from './HeroSection2.module.css'


export default function HeroSection2() {
  return (

    <div className={c.container}>
      <div className={c.contentContainer} >
        <section className={c.section}>
          <Card
            title={'Title'}
            description="BOOK YOUR CRUISE"
            image={image6}
          />
        </section>
        <section className={c.section}>
          <Card
            title={'Title'}
            description="BOOK YOUR CRUISE"
            image={img81}
          />
        </section>
        <section className={c.section}>
          <Card
            title={'Title'}
            description="BOOK YOUR CRUISE"
            image={image6}
          />
        </section>
      </div>
  </div>

  )
}
