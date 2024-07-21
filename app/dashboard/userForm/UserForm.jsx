import { useState } from 'react';
import Button from '@/app/components/Button';
import axios from 'axios';
import c from './UserForm.module.css';

// handle if is a edit or create new user by receiving a prop
export default function UserForm() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState();
  const [showCloseBtn, setShowCloseBtn] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
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
      };
      console.log(user);
      const res = await axios.post('http://localhost:3000/api/register', user);

      console.log(res.status);

      if (res.status === 200) {
        console.log('success');
        setName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setType('');
      } else {
        console.log('error');
        alert('Failed to register');
      }
    }
  }

  return (
    <>
      <div className={c.container}>
        <form className={c.form} onSubmit={handleSubmit}>
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
            <label htmlFor="lastname">Last Name</label>
            <input
              required
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              id="lastname"
              placeholder="Last Name"
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
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Password"
            />
          </div>
          <div className={c.row}>
            <label>Choose Type of user</label>
            <select
              className={c.select}
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              <option value="">Select</option>
              <option value="admin">Admin</option>
              <option value="crew">Crew</option>
              <option value="captain">Captain</option>
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
              <Button className={c.btnSubmit} type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
