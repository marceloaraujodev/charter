'use client'
import { useState, useEffect } from 'react';
import Button from '@/app/components/Button';
import axios from 'axios';
import Spinner from './Spinner';
import Title from './Title';
import c from './Form.module.css';

// handle if is a edit or create new user by receiving a prop
export default function Form() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState();
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     setName(user.name || '');
  //     setLastName(user.lastName || '');
  //     setEmail(user.email || '');
  //     setPassword(user.password || '');
  //     setPhone(user.phone || '');
  //     setType(user.type || '');
  //     setId(user._id);
  //   }
  // }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    // setIsLoading(true);
    
    try {
      const user = {
        name,
        lastName,
        email,
        // password,
        phone,
        date,
        message,
      };
      const res = await axios.post('/api/book', user);
      console.log(res.data)
      
      if (res.data.availability === 'available') {
          setName('');
          setLastName('');
          setEmail('');
          setPhone('');
          setType('');
          setDate('');
          setMessage('');
        } else {
          setDisplayMessage(true);
        }
      
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  // function handleDisplayMessage(){
  //   setDisplayMessage(!displayMessage)
  // }

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

        <Title title='Book your Charter' center={true} />
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
            {/* PASSWORD */}
          {/* <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Password"
          /> */}

            {/* ROLE */}
          {/* <label>Choose Role</label>
          <select
            className={c.select}
            onChange={(e) => setType(e.target.value)}
            value={type}
           >
            <option value="">Select</option>
            <option value="admin">Admin</option>
            <option value="crew">Crew</option>
            <option value="captain">Captain</option>
            <option value="vendor">Vendor</option>
          </select> */}
          
          <label>Phone</label>
          <input
            required
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />
          <label>Date</label>
          <input
            required
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date"
          />

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
