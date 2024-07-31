import { useState, useEffect } from 'react';
import Button from '@/app/components/Button';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import c from './UserForm.module.css';

// handle if is a edit or create new user by receiving a prop
export default function UserForm({
  user,
  submitType,
  apiEndpoint,
  method,
  onEditDone,
  view,
}) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId] = useState(user ? user._id : null);
  const [type, setType] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setPassword(user.password || '');
      setPhone(user.phone || '');
      setType(user.type || '');
      setId(user._id);

      // console.log(id);
    }
  }, [user]);

  // console.log(view);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (type === undefined || type === '') {
        alert('Please select user type');
        return;
      } else {
        const user = {
          name,
          lastName,
          email,
          password,
          phone,
          type,
          _id: id, // if is an edit, we pass the id
        };
        const res = await axios({
          method: method || (submitType === 'register' ? 'post' : 'put'),
          url: apiEndpoint,
          data: user,
        });

        if (res.status === 200) {
          console.log('success');
          setName('');
          setLastName('');
          setEmail('');
          setPassword('');
          setPhone('');
          setType('');
          if (onEditDone) onEditDone();
          setIsLoading(false);
          displayMessage('success');
        } else {
          console.log('error');
          alert('Failed to register');
          displayMessage('fail');
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  function displayMessage(message) {
    if (message ==='success') {
      setConfirmMessage(message);
      setTimeout(() => setConfirmMessage(null), 3000);
    }else if (message === 'fail') {
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

        {confirmMessage && <p className={confirmMessage === 'success' ? 'success' : 'fail'}>{confirmMessage === 'success' ? 'User Created Successfully' : 'Failed to register'}</p>}

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
  
          {view === 'vendors' || view === 'createvendor' ? (
            <>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="Email - optional"
              />
            </>
        
          ) : (
            <> 
              <label htmlFor="email">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="Email"
              />
              <label htmlFor="password">Password</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="Password"
              />
            </>
          )}

          
            <label>Choose Role</label>
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
            </select>
            <label>Phone</label>
            <input
              required
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
            <div className={c.btnContainer}>
              <Button className={c.btnSubmit} size="default" type="submit">
                {submitType === 'register' ? 'Submit' : 'Edit'}
              </Button>
            </div>
          
        </form>
      </div>
    </>
  );
}
