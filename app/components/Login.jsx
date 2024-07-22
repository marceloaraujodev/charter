'use client';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';
import Spinner from './Spinner';

import c from './Login.module.css';

export default function loginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  // console.log(session)

  function handleInput(e) {
    if (e.target.id === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }

  async function handleSubmit(e) {
    setIsLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    // console.log('res from login', res);
    if (res.ok) {
      // console.log('authenticated');
      router.push('/dashboard');
    } else {
      console.log('wrong user or pass');
      setIsLoading(false);
    }
  }

  return (
    <div className={c.container}>
      {isLoading ? <Spinner /> : (
        <form className={c.containerInner} onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleInput}
            type="email"
            id="email"
            value={email}
            placeholder="email"
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={handleInput}
            type="password"
            id="password"
            value={password}
            placeholder="password"
          />
          <Button 
          type="submit" 
          // disabled={true}
          className={c.btn}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}
