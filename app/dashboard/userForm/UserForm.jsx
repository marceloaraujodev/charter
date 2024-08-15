import { useState, useEffect } from 'react';
import Button from '@/app/components/Button';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { ToastContainer} from 'react-toastify';
import notify from '@/app/utils/notifications';
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
        console.log('this is edidt user', user);
        
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
          if (onEditDone) onEditDone();
          setIsLoading(false);
          notify('success', 'New user created successfully!');
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
      <ToastContainer
        autoClose={500000}
      />
    </>
  );
}

