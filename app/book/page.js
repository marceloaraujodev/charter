'use client'
import PageContent from "../components/PageContent";
import Form from "../components/Form";


export default function BookNow() {
  return (
    <PageContent>
        <Form 
        title='Book Your Charter' 
        apiEndpoint='/api/book' 
        type='book'
      />
    </PageContent>
  )
}