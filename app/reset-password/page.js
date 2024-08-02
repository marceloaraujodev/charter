'use client';
import PageContent from '../components/PageContent';
import { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Title from '../components/Title';
import c from '../components/Login.module.css';
export default function page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resMessage, setResMessage] = useState(false);
  const searchParams = useSearchParams();
  const userEmail = searchParams.get('email');

  useEffect(() => {
    setEmail(userEmail);
    setResMessage(false);
  }, []);

  function handleInput(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const user = {
      email,
      password,
    };
    try {
      const res = await axios.post('/api/reset-password', user);
      console.log(res);
      if (res.status === 200) {
        setPassword('');
        setResMessage(true);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <PageContent>
      <div className={c.container}>
        {isLoading && (
          <div className={`${c.spinnerCont}`}>
            <Spinner />
          </div>
        )}

        {resMessage ? (
          <div className={c.successMessage}>Reset Password Successful</div>
        ) : (
          <>
          <Title title="Reset Password" center={true} />
            <form
              className={`${c.containerInner} ${isLoading ? c.loading : ''}`}
              onSubmit={handleSubmit}
             >
              <label htmlFor="password" className={c.passwordLabel}>
                New Password
              </label>
              <input
                onChange={handleInput}
                type="password"
                id="password"
                value={password}
                placeholder="New Password"
              />
              <Button type="submit" className={c.btn}>
                Submit
              </Button>
            </form>
          </>
        )}
      </div>
    </PageContent>
  );
}
