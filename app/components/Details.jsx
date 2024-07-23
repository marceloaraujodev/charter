'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Button from './Button';
// import { useRef } from 'react';
import Image from 'next/image';
import image6 from '@/public/images/yacht-6.JPG';
import Title from './Title';
import c from './Details.module.css';
export default function Details() {
  const router = useRouter();

  // const imgRef = useRef();
  // const descriptionRef = useRef();

  // const animationConfig = {
  //   initial: { x: 100, opacity: 0 },
  //   whileInView: { x: 0, opacity: 1 },
  //   viewport: { once: true },
  // };

  function handleClick(type) {
    console.log(type)
  }

  return (
    <>
      <div className={c.container}>
        <div className={c.waveContainer}>
          <div className={c.wave}>
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className={c.shapeFill}
              ></path>
            </svg>
          </div>
        </div>

        <div className={c.row}>
          <div className={c.block}>
            <motion.div
              className={c.right}
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h2>LUXURY YACHT RENTALS & EVENTS</h2>
              <p>
                Headquartered in Miami, Florida, we offer a wide variety of
                boats and event planning services including luxury yacht
                rentals, yacht charters, party boat rentals, speed boat rentals,
                yacht weddings
              </p>
              {/* <div>
              <Button classname={c.btn}>Read More</Button>
            </div> */}
            </motion.div>

            <motion.div
              className={c.left}
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <Image src={image6} width="auto" height="auto" alt="blockImg" />
            </motion.div>
          </div>
        </div>
      </div>

      <section className={c.section}>
        <div className={c.titleContainer}>
          <Title title="Activities" center={true} />
        </div>

        <div className={c.callCont}>
          <div className={c.svgCont}>
            <div className={c.circle} onClick={() => handleClick('call')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </div>

            <div className={c.circle} onClick={() => handleClick('email')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            </div>

          </div>

          <p>Please contact our Yacht Charter Agents if the featured luxury vessels for charter above do not meet your expectations or requirements.

          Our office will gladly and quickly provide you with additional vessel options and any other special requests.</p>
          
        </div>
      </section>
    </>
  );
}
