import Nav from './Nav'
import Content from './Content'
import Footer from './Footer'

export default function MainLayout({children}) {
  return (
    <>
      <Nav />
      <Content>{children}</Content>
      <Footer/>
    </>
  )
}
