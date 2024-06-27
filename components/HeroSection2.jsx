import React from 'react'
import Card from './Card';
import Image from 'next/image';
import boat from '../public/images/2.jpg';
import image6 from '../public/images/yacht-6.JPG'
import img47 from '../public/images/yacht-47.JPG'
import img81 from '../public/images/yacht-51.JPG';
import img12 from '../public/images/yacht-12.JPG';
import c from './HeroSection2.module.css'


export default function HeroSection2() {
  return (

    <div className={c.container}>
      <div className={c.contentContainer} >
        <section className={c.section}>
          <Card
            title='PRIVACY'
            description="Description of each card goes here."
            image={img12}
          />
        </section>
        <section className={c.section}>
          <Card
            title='ENTERTAINMENT'
            description="Description of each card goes here."
            image={img81}
          />
        </section>
        <section className={c.section}>
          <Card
            title='COMFORT'
            description="Description of each card goes here."
            image={img47}
          />
        </section>
      </div>
  </div>

  )
}
