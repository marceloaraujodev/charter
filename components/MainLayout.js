import Nav from './Nav';
import Content from './Content';
import Footer from './Footer';
import BackgroundImg from './BackgroundImg';
import { motion, useScroll, useSpring} from 'framer-motion';

export default function MainLayout({ children }) {
  // const { scrollYProgress } = useScroll();




  return (
    <>
        <Nav />
        <BackgroundImg />
        <Content>{children}</Content>
        <Footer />
    </>
  );
}
