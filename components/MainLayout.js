import Nav from './Nav'
import Content from './Content'
import Footer from './Footer';


export default function MainLayout({children, router}) {
  return (
    <>
      <Nav router={router} />
      <Content>{children}</Content>
      <Footer/>
    </>
  )
}
