import PageContent from "../components/PageContent"
import Title from "../components/Title"
import ContactUs from "../components/ContactUs"
export default function page() {
  return (
    <PageContent>
      <Title title="Send us a message" center={true}></Title>
      {/* <p>This is a page component.</p> */}
      <ContactUs />
    </PageContent>
  )
}