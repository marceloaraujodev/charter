'use client'
import React from 'react';
import { signIn, signOut, useSession } from "next-auth/react"



export default function page() {
  const { data: session, status } = useSession();

  if(!session){
    return (<div className="container">
      <h2>You are not authorized to see this page</h2>
    </div>)
  }

  return (
    <div className='container'> Success protected page</div>
  )
}
