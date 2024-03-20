import Nav from './Nav'
import Content from './Content'
import Footer from './Footer';
import Card from './Card';
import BackgroundImg from './BackgroundImg';


export default function MainLayout({children, router}) {
// export default function MainLayout({children}) {
  return (
    <>

      <Nav  />
      <BackgroundImg />
      <Content>
      {children}</Content>
      <Footer/>
    </>
  )
}
