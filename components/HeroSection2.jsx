import React from 'react'
import Card from './Card';
import Image from 'next/image';
import boat from '../public/images/2.jpg';
import c from './HeroSection2.module.css'


export default function HeroSection2() {
  return (

    <div className={c.mainContainer}>
        
    <section className={c.section}>
      <Card
        title={'Title'}
        description="BOOK YOUR CRUISE"
        image={<Image src={boat} width={350} alt="boat" />}
      />
    </section>
    <section className={c.section}>
      <Card
        title={'Title'}
        description="BOOK YOUR CRUISE"
        image={<Image src={boat} width={350} alt="boat" />}
      />
    </section>
    <section className={c.section}>
      <Card
        title={'Title'}
        description="BOOK YOUR CRUISE"
        image={<Image src={boat} width={350} alt="boat" />}
      />
    </section>

  </div>

  )
}
