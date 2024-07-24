'use client';
import { useState, useEffect } from 'react';
import Button from './Button';
import axios from 'axios';
import Spinner from './Spinner';
import c from './ContactUs.module.css';

// handle if is a edit or create new user by receiving a prop
export default function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(null);

  // useEffect(() => {
  //   if (user) {
  //     setName(user.name || '');
  //     setEmail(user.email || '');
  //     setPhone(user.phone || '');

  //     // console.log(id);
  //   }
  // }, []);

  // console.log(view);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = {
        name,
        email,
        phone,
        message
      };
      console.log(user)
      const res = await axios({
        method: 'post',
        url: '/api/contact',
        data: user,
      });
      console.log(res)
      if (res.status === 200) {
        console.log('success');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setConfirmMessage('success');
        setIsLoading(false);
        displayMessage('success');
      } else {
        console.log('error');
        alert('Failed to register');
        setConfirmMessage('fail');
        displayMessage('fail');
      }
      
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  function displayMessage(message) {
    if (message === 'success') {
      setConfirmMessage(message);
      setTimeout(() => setConfirmMessage(null), 3000);
    } else if (message === 'fail') {
      setConfirmMessage(message);
      setTimeout(() => setConfirmMessage(null), 3000);
    }
  }

  return (
    <>
      <div className={c.container}>
        {isLoading && (
          <div className={c.spinner}>
            <Spinner />
          </div>
        )}

        {confirmMessage && (
          <p className={confirmMessage === 'success' ? 'success' : 'fail'}>
            {confirmMessage === 'success'
              ? 'Message sent successfully'
              : 'Failed to send message'}
          </p>
        )}

        <form
          className={`${c.form} ${isLoading ? c.loading : ''}`}
          onSubmit={handleSubmit}
         >
          <div className={c.row}>
            <label htmlFor="name">Name</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="First Name"
            />
          </div>
 
            <div className={c.row}>
              <label htmlFor="email">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="Email"
              />
            </div>
        

          <div className={c.row}>
            <label>Phone</label>
            <input
              required
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
            <label htmlFor="message">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="message"
              placeholder="Your message here"
            />
            <div className={c.btnContainer}>
              <Button className={c.btnSubmit} size="default" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
