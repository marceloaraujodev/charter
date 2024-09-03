import { useState, useEffect } from 'react';
import Button from '@/app/components/Button';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { ToastContainer } from 'react-toastify';
import notify from '@/app/utils/notifications';
import formatPhoneNumber from '@/app/utils/formatPhoneNumber';
import c from './UserForm.module.css';

// handle if is a edit or create new user by receiving a prop
export default function UserForm({
  user,
  submitType,
  apiEndpoint,
  method,
  onEditDone,
  view,
  isEditing,
}) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [id, setId] = useState(user ? user._id : null);
  const [type, setType] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setPassword(user.password || '');
      setPhone(user.phone || '');
      setType(user.type || '');
      setCompany(user.company || '');
      setId(user._id);

      // console.log(id);
    }
  }, [user]);


  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if(submitType === 'submit') {
        console.log('submit code here')
        if (type === undefined || type === '') {
          alert('Please select user type'); return;
        }

        const user = {
          name,
          lastName,
          email,
          password,
          phone,
          type,
          company,
          _id: id, // if is an edit, we pass the id
        };
        console.log('this is edit user', user);
        const res = await axios({
          method: method || (submitType === 'register' ? 'post' : 'put'),
          url: apiEndpoint,
          data: user,
        });
        console.log(res)
        if (res.status === 200) {
          console.log('success');
          setName('');
          setLastName('');
          setEmail('');
          setPassword('');
          setPhone('');
          setType('');
          setCompany('');
          if (onEditDone) onEditDone();
          setIsLoading(false);
          notify('success', 'New user created successfully!');
        } else {
          notify('error', 'Failed to register');
        }
      }else{
        console.log('editing code here')
          console.log('enter put condition for editing vendors')
        const updatedUser = {
          name,
          lastName,
          email,
          phone,
          company,
          _id: id, // if is an edit, we pass the id
        };
        console.log('enter vendor', updatedUser);
        const res = await axios.put(
          'http://localhost:3000/api/vendors',
          updatedUser
        );
        console.log(res)
        if (res.status === 200) {
          setIsLoading(false);
          console.log('success');
          notify('success', 'User updated successfully!');
        } else {
          notify('error', 'Failed to register');
        }
      }
      
    } catch (error) {
      notify('error', 'Failed to register, internal error');
      setIsLoading(false);
      console.log(error);
    }
  }

  function handlePhoneChange(e) {
    const input = e.target.value;
    const formattPhone = formatPhoneNumber(input);
    setPhone(formattPhone);
  }

  return (
    <>
      <div className={c.container}>
        {isLoading && (
          <div className={c.spinner}>
            <Spinner />
          </div>
        )}

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

          {/* {view === 'createvendor' && (
            <>
              <label>Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company"
              />
            </>
            )} */}

          {view === 'vendors' || isEditing || view === 'createvendor' ? (
            <>
              <label>Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company"
              />

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
            </>
          )}

          <label>Phone</label>
          <input
            required
            type="text"
            value={phone}
            onChange={(e) => handlePhoneChange(e)}
            placeholder="+xx xxx xxx-xxxx"
          />

          <div className={c.btnContainer}>
            <Button className={c.btnSubmit} size="default" type="submit">
              {submitType === 'register' ? 'Submit' : 'Edit'}
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={5000} />
    </>
  );
}
