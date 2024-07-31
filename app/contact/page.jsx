import PageContent from "../components/PageContent"
import Form from "../components/Form"
export default function page() {
  return (
    <PageContent>
      <Form 
        title='Send Us a Message'
        apiEndpoint='/api/contact' 
        type='message'
      />
    </PageContent>
  )
}