import React from 'react'
import Image from 'next/image';
import image6 from '../public/images/yacht-6.JPG'
import img81 from '../public/images/yacht-51.JPG';
import c from './Blocks.module.css';
import Button from './Button';

export default function Blocks() {
  return (
    <>
    <div className={c.row}>

      <div className={c.block}>
        <div className={c.left}>          
          <Image
            src={image6}
            width='auto'
            height='auto'
            alt='blockImg'
              />
          </div>
        <div className={c.right}>
          <h2>LUXURY YACHT RENTALS & EVENTS</h2>
          <p>Headquartered in Miami, Florida, we offer a wide variety of boats and event planning services including luxury yacht rentals, yacht charters, party boat rentals, speed boat rentals, yacht weddings</p>
        <Button>Read More</Button>
        </div>
      </div>
    </div>

    <div className={c.row}>

    <div className={`${c.block} ${c.reverseBlock}`}>
        <div className={`${c.right} ${c.rightBackground}`}>          
          <h2>LUXURY YACHT RENTALS & EVENTS</h2>
          <p>Headquartered in Miami, Florida, we offer a wide variety of boats and event planning services including luxury yacht rentals, yacht charters, party boat rentals, speed boat rentals, yacht weddings</p>
        <Button classname={c.btn}>Read More</Button>
          </div>
        <div className={c.left}>
          <Image
            src={img81}
            width='auto'
            height='auto'
            alt='blockImg'
              />
        </div>
      </div>
    </div>
    </>
  )
}
