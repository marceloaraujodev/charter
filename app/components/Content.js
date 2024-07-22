
import c from './IndexPage.module.css';
import { motion, useScroll, useSpring} from 'framer-motion';


export default function Content({children}) {
  const { scrollYProgress } = useScroll();

  const animationConfig = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1, transition: { duration: 1.7 } },
  };

  return (
    <>
      <div className={c.contentContainer}>
        {children}
      </div>
    </>
  );
}

