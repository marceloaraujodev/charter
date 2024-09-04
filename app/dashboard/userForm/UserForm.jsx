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
  const [type, setType] = useState('admin');
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

  // handles responses
  async function handleResponses(res, message) {
    if (res.status === 200) {
      console.log('success');
      // if (onEditDone) onEditDone();
      setIsLoading(false);
      notify('success', message);
    } else {
      notify('error', 'Failed please try again.');
    }
  }

  //handle fetch
  async function fetch(method, data){
    const res = await axios({
      method: method,
      url: apiEndpoint,
      data: data,
    });

    return res
  }

  // creates or updates a user
  async function handleCreateUser(){
    const user = {
      name,
      lastName,
      email,
      password,
      phone,
      type,
      company,
    };
    const res = await fetch('post', user);
    handleResponses(res, 'New user created successfully!')
  }

  // updates a user
  async function handleUpdateUser(){
    const updatedUser = {
      name,
      lastName,
      email,
      phone,
      password,
      _id: id, 
    };
    console.log(updatedUser)
    const res = await fetch('put', updatedUser)
    handleResponses(res, 'User updated successfully!');
  }

  // creates vendor
  async function handleCreateVendor(){
    const vendor = {
      name,
      lastName,
      email,
      phone,
      company,
    };
    const res = await fetch('post', vendor);
    handleResponses(res, 'Vendor created successfully!')
  }

  // updates vendor
  async function handleUpdateVendor(){
    const updateVendor = {
      name,
      lastName,
      email,
      phone,
      company,
      _id: id,
    };
    const res = await fetch('put', updateVendor);
    handleResponses(res, 'Vendor updated successfully!')
  }


  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log('view: ->>>>>',view)
      if(view === 'createuser'){
        await handleCreateUser();
      }else if(view === 'users'){
        await handleUpdateUser();
      }else if(view === 'createvendor'){
        await handleCreateVendor();
      }else if(view === 'vendors'){
        await handleUpdateVendor();
      }else{
        notify('error', 'Please try again later');
        setIsLoading(false);
        return;
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

          {(view === 'vendors' && isEditing) || view === 'createvendor' ? (
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
                required
              >
                <option value="" disabled>Select</option>
                <option value="admin">Admin</option>
                <option value="crew">Crew</option>
                <option value="captain">Captain</option>
                <option value="vendor">Vendor</option>
              </select>
            </>
          )}

          <label>Phone</label>
          <input
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
