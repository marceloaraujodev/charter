'use client'
import React from 'react';
import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import c from './page.module.css';

export default function Reviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className={c.container}>

      <motion.section className={c.contentContainer} ref={ref}
         initial={{opacity: 0, y: 200}}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 200 }}
      >
        <div className={c.photo}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
            className="rounded-circle shadow-1-strong"
            width="150"
            height="150"
          />
        </div>
        <div className={c.name}>Maria Smantha</div>
        <div className={c.profession}>Web Developer</div>
        <div className={c.descriptionContainer}>
          <p className="px-xl-3">
            <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur
            quae quaerat ad velit ab hic tenetur.
          </p>
        </div>

        <ul
          className={`list-unstyled mb-0 ${c.ratingContainer}`}
        >
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
        </ul>
      </motion.section>
      
      <motion.section className={c.contentContainer} ref={ref}
         initial={{opacity: 0, y: 200}}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 200 }}
        transition={{ delay: 0.2 }}
      >
        <div className={c.photo}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
            className="rounded-circle shadow-1-strong"
            width="150"
            height="150"
          />
        </div>
        <div className={c.name}>Maria Smantha</div>
        <div className={c.profession}>Web Developer</div>
        <div className={c.descriptionContainer}>
          <p className="px-xl-3">
            <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur
            quae quaerat ad velit ab hic tenetur.
          </p>
        </div>

        <ul
          className={`list-unstyled mb-0 ${c.ratingContainer}`}
        >
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
        </ul>
      </motion.section>
      
      <motion.section className={c.contentContainer} ref={ref}
         initial={{opacity: 0, y: 200}}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 200 }}
        transition={{ delay: 0.4 }}
      >
        <div className={c.photo}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
            className="rounded-circle shadow-1-strong"
            width="150"
            height="150"
          />
        </div>
        <div className={c.name}>Maria Smantha</div>
        <div className={c.profession}>Web Developer</div>
        <div className={c.descriptionContainer}>
          <p className="px-xl-3">
            <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur
            quae quaerat ad velit ab hic tenetur.
          </p>
        </div>

        <ul
          className={`list-unstyled mb-0 ${c.ratingContainer}`}
        >
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
        </ul>
      </motion.section>

    </div>
  );
}
