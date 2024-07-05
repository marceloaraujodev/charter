'use client';
import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from 'next/image';
import c from './crew.module.css';
import nick from '../../public/images/crew/captain-nick.jpg';
import yandri from '../../public/images/crew/captain-yandri.jpg';
import james from '../../public/images/crew/captain-james.jpg';
import BackgroundImg from '@/components/BackgroundImg';


export default function crew() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true })
  
  // {/* <BackgroundImg className={`crew` } /> */}
  return (
    <>

    <div className='container'>

      <div className={c.containerInner}>
      <motion.section ref={ref} className={c.contentContainer} 
        initial={{opacity: 0, y: 200}}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 200 }}
      >
        <div className={c.photo}>
          <Image 
          src={nick} 
          width={150} 
          height={150} 
          alt={'captain'}
          className="rounded-circle shadow-1-strong object-fit-cover"/>
        </div>
        <div className={c.name}>Nick</div>
        <div className={c.profession}>Captain</div>
        <div className={c.descriptionContainer}>
          <p className="">
            Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur
            quae quaerat ad velit ab hic tenetur.
          </p>
        </div>
      </motion.section>

      <motion.section className={c.contentContainer}
        initial={{opacity: 0, y: 200}}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 200 }}
        transition={{ delay: 0.2 }}
       >
        <div className={c.photo}>
          <Image 
          src={yandri} 
          width={150} 
          height={150} 
          alt={'captain'}
          className="rounded-circle shadow-1-strong object-fit-cover"/>
        </div>
        <div className={c.name}>Yandri</div>
        <div className={c.profession}>Captain</div>
        <div className={c.descriptionContainer}>
          <p className="px-xl-3">
            <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur
            quae quaerat ad velit ab hic tenetur.
          </p>
        </div>
      </motion.section>

      <motion.section className={c.contentContainer}
        initial={{opacity: 0, y: 200}}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 200 }}
        transition={{ delay: 0.4 }}
       >
        <div className={c.photo}>
          <Image 
          src={james} 
          width={150} 
          height={150} 
          alt={'captain'}
          className="rounded-circle shadow-1-strong object-fit-cover"/>
        </div>
        <div className={c.name}>James</div>
        <div className={c.profession}>Captain</div>
        <div className={c.descriptionContainer}>
          <p className="px-xl-3">
            <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur
            quae quaerat ad velit ab hic tenetur.
          </p>
        </div>
      </motion.section>
    </div>
    </div>

    {/* <div className={c.container}>
      <div className={c.containerInner}>
        <motion.section
          className={c.contentContainer}
          ref={ref}
          initial={{ opacity: 0, y: 200 }}
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
              amet, consectetur adipisicing elit. Quod eos id officiis hic
              tenetur quae quaerat ad velit ab hic tenetur.
            </p>
          </div>


        </motion.section>

        <motion.section
          className={c.contentContainer}
          ref={ref}
          initial={{ opacity: 0, y: 200 }}
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
              amet, consectetur adipisicing elit. Quod eos id officiis hic
              tenetur quae quaerat ad velit ab hic tenetur.
            </p>
          </div>


        </motion.section>

        <motion.section
          className={c.contentContainer}
          ref={ref}
          initial={{ opacity: 0, y: 200 }}
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
              amet, consectetur adipisicing elit. Quod eos id officiis hic
              tenetur quae quaerat ad velit ab hic tenetur.
            </p>
          </div>

        </motion.section>
      </div>
    </div> */}

    </>
  )
}
