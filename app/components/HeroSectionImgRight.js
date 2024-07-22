// import { useRef } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import c from './HeroSectionImgRight.module.css';
// import Image from 'next/image';


// export default function HeroSectionImgRight({title, description, image}) {
//   const imgRef = useRef();
//   const titleRef = useRef();
//   const descriptionRef = useRef();

//   const animationConfig = {
//     initial: { x: -100, opacity: 0 },
//     whileInView: { x: 0, opacity: 1 },
//     viewport: {once: true}
//   }
//   return (
//     <div className={c.container}>
//     <div className={c.contentContainer}>
//       <div className={c.heroRow}>
//         <div className={c.left}>
//           <motion.div 
//               {...animationConfig}
//               ref={titleRef} 
//             className={c.title}>{title}</motion.div>
//           <motion.div 
//               {...animationConfig}
//               ref={titleRef}
//             className={c.description}>
//             {description}
//           </motion.div>
//         </div>

//         <motion.div 
//             initial={{ x: 100, opacity: 0}}
//             whileInView={{x: 0, opacity: 1}}
//             transition={{duration: 0.4}}
//             viewport={{once: true}}
//             ref={imgRef}
//           className={c.right}>
//           <Image
//           className={c.img}
//             src={image}
//             alt="Hero Section Image"
//             width={500}
//             height={300}
//           />
//         </motion.div>
//       </div>
//     </div>
//     </div>
//   );
// }
