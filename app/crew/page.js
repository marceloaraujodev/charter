'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Title from '../components/Title';
import c from './crew.module.css';
import nick from '../../public/images/crew/captain-nick.jpg';
import yandri from '../../public/images/crew/captain-yandri.jpg';
import james from '../../public/images/crew/captain-james.jpg';
import BackgroundImg from '@/app/components/BackgroundImg';
import Wave from '../components/Wave';

export default function crew() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // {/* <BackgroundImg className={`crew` } /> */}
  return (
    <>
      <div className={c.container}>
        <div className={c.titleCont}>
          <Title title="Crew" />
        </div>
        <div className={c.row}>
          <Wave position="middle" />
          <div className={c.containerInner}>
            <motion.section
              ref={ref}
              className={c.contentContainer}
              initial={{ opacity: 0, y: 200 }}
              transition={{ duration: 0.3, delay: 0.1}}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 200 }}
            >
              <div className={c.photo}>
                <Image
                  src={nick}
                  width={150}
                  height={150}
                  alt={'captain'}
                  className="rounded-circle shadow-1-strong object-fit-cover"
                />
              </div>
              <div className={c.name}>Nick</div>
              <div className={c.profession}>Captain</div>
              <div className={c.descriptionContainer}>
                <p className="">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                  eos id officiis hic tenetur quae quaerat ad velit ab hic
                  tenetur.
                </p>
              </div>
            </motion.section>

            <motion.section
              ref={ref}
              className={c.contentContainer}
              initial={{ opacity: 0, y: 200 }}
              transition={{ duration: 0.3, delay: 0.2}}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 200 }}
            >
              <div className={c.photo}>
                <Image
                  src={james}
                  width={150}
                  height={150}
                  alt={'captain'}
                  className="rounded-circle shadow-1-strong object-fit-cover"
                />
              </div>
              <div className={c.name}>James</div>
              <div className={c.profession}>Captain</div>
              <div className={c.descriptionContainer}>
                <p className="">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                  eos id officiis hic tenetur quae quaerat ad velit ab hic
                  tenetur.
                </p>
              </div>
            </motion.section>

            <motion.section
              ref={ref}
              className={c.contentContainer}
              initial={{ opacity: 0, y: 200 }}
              transition={{ duration: 0.3, delay: 0.3}}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 200 }}
            >
              <div className={c.photo}>
                <Image
                  src={yandri}
                  width={150}
                  height={150}
                  alt={'captain'}
                  className="rounded-circle shadow-1-strong object-fit-cover"
                />
              </div>
              <div className={c.name}>Yandri</div>
              <div className={c.profession}>Captain</div>
              <div className={c.descriptionContainer}>
                <p className="">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                  eos id officiis hic tenetur quae quaerat ad velit ab hic
                  tenetur.
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </>
  );
}
