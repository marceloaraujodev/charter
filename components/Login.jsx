'use client'
import React from 'react';
import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from 'react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation'

import axios from 'axios';

import c from './Login.module.css';

export default function loginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const router = useRouter();
  const {data: session} = useSession();

  function handleInput(e){
    if(e.target.id === 'email'){
      setEmail(e.target.value)
    }else{
      setPassword(e.target.value)
    }
  }

  async function handleSubmit(e){
    e.preventDefault();
    // console.log('form submitted')
    // const formData = {
    //   email,
    //   password
    // }
    // console.log(formData)
    // const res = await axios.post('http://localhost:3000/api/login', formData)

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    })

    console.log(res)
    if(res.ok){
      console.log('authenticated')
      router.push('/dashboard')
    }else{
      console.log('wrong user or pass') 
    }
  }

  if(session){
    console.log(session)
  }

  return (
    <div className='container'>
      <form className={c.containerInner} onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input onChange={handleInput} type='email' id='email' value={email} placeholder='email'/>
        <label htmlFor='password'>Password</label>
        <input onChange={handleInput} type='password' id='password' value={password} placeholder='password' />
        <Button type='submit' className={c.btn}>Submit</Button>
      </form>
    </div>
  )
}