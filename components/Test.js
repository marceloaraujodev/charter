'use client';
import Link from 'next/link'
import { motion } from 'framer-motion';

export default function Test() {
  return (<div>
    <Link href={'#'}>Text2</Link>
    <motion.div whileHover={{scale: 1.5}}>TESTTSSTTS</motion.div>;
    <motion.div whileHover={{scale: 1.5}}><Link href={'#'}>Text55</Link></motion.div>;
  </div>)
}
