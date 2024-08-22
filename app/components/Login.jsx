'use client';
import React from 'react';
import { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';
import Spinner from './Spinner';
import axios from 'axios';
import Title from './Title';
import c from './Login.module.css';

export default function loginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [checkYourEmailMessage, setCheckYourEmailMessage] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && session.expires) {
      const { expires } = session;
      if (isSessionExpired(expires)) {
        signOut();
      } else {
        router.push('/dashboard');
      }
    }
  }, [status, session]);

  // console.log(session);

  function isSessionExpired(expires) {
    return new Date(expires) < new Date();
  }

  function handleInput(e) {
    if (e.target.id === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }

  async function fogortPassword() {
    setIsLoading(true);
    console.log('enter forgot');
    try {
      const res = await axios.post('/api/forgotpassword', { email });
      console.log(res);
      if (res.status === 200) {
        setEmail('');
        setCheckYourEmailMessage(true);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setForgot(false);
  }

  async function login() {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (res.ok) {
        router.push('/dashboard');
      } else {
        console.log('wrong user or pass');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (!email || (!forgot && !password)) {
      alert('Please enter email and password');
      setIsLoading(false);
      return;
    }

    if (forgot) {
      fogortPassword();
    } else {
      login();
    }
  }

  return (
    <div className={c.container}>
      {isLoading && (
        <div className={`${c.spinnerCont}`}>
          <Spinner />
        </div>
      )}

      {checkYourEmailMessage ? (
        <>
          <div className={c.checkEmailCont}>
            <Title title="Please check your email" center={true} />
            <span
              onClick={() => setCheckYourEmailMessage(false)}
              className={c.back}
            >
              Back to Login
            </span>
          </div>
        </>
      ) : (
        <>
          <Title className={c.loginTitle} center={true} title={forgot ? 'Forgot Password' : 'Login'}  />
          <form
            className={`${c.containerInner} ${isLoading ? c.loading : ''}`}
            onSubmit={handleSubmit}
          >
            <label htmlFor="email">Email</label>
            <input
              onChange={handleInput}
              type="email"
              id="email"
              value={email}
              placeholder="email"
            />
            {forgot ? (
              <>
                <span onClick={() => setForgot(false)} className={c.forgot}>
                  Login
                </span>
              </>
            ) : null}

            {!forgot ? (
              <>
                <label htmlFor="password" className={c.passwordLabel}>
                  Password
                </label>
                <input
                  onChange={handleInput}
                  type="password"
                  id="password"
                  value={password}
                  placeholder="password"
                />
                <span onClick={() => setForgot(true)} className={c.forgot}>
                  Forgot password?
                </span>
              </>
            ) : null}
            <Button
              type="submit"
              // disabled={true}
              className={c.btn}
            >
              Submit
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
