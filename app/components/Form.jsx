'use client'
import { useState, useEffect } from 'react';
import Button from '@/app/components/Button';
import axios from 'axios';
import Spinner from './Spinner';
import Title from './Title';
import c from './Form.module.css';

export default function Form({title, apiEndpoint, type}) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const user = {name, lastName, email, phone, message}; 
    if(type === 'book'){
      user.date = date;
    }

    try {
      const res = await axios.post(apiEndpoint, user);
      console.log(res.data);

      // cases for the book type
      if(type === 'book'){
        // if date has charter show message to choose another date
        // if date has no chater message goes to server reset fields 
        if(type === 'book' && res.data.availability !== 'available'){
          setDisplayMessage(true);
        } else {
          setIsLoading(false);
          setName('');
          setLastName('');
          setEmail('');
          setPhone('');
          setDate('');
          setMessage('');
        }
      }else if(type === 'message'){
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
      }

      
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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

        {displayMessage && <div className={c.confirmDelete}>
          <p>Not available, please choose another date.</p>
          <div className={c.btnContainer}>
            <Button onClick={() => {
              setDisplayMessage(!displayMessage)
            }} classname={c.btn}>Close</Button> 
          </div>
        </div>}

        <Title title={title} center={true} />
        <form
          className={`${c.form} ${isLoading ? c.loading : ''}`}
          onSubmit={handleSubmit}
         >
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="First Name"
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            required
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastname"
            placeholder="Last Name"
          />

          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Email - optional"
          />
                      
          <label>Phone</label>
          <input
            required
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />
          {/* if book form this will render */}
          {type === 'book' && (
            <>
              <label>Date</label>
              <input
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Date"
              />
            </>
          )}

          <label name="message" type="text">
            Message
          </label>
          <textarea
            type="text"
            name="message"
            className={c.textArea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className={c.btnContainer}>
            <Button className={c.btnSubmit} size="default" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
