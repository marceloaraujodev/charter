import { useState, useEffect } from 'react';
import UserForm from '../userForm/UserForm';
import Button from '@/app/components/Button';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import notify from '@/app/utils/notifications';
import { ToastContainer } from 'react-toastify';
import c from './Users.module.css';

export default function Users({ view }) {
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      if (!session) return;
      if (view === 'vendors') {
        const res = await axios.get('/api/vendors');
        setUsers(res.data.vendors);
      } else if (view === 'users') {
        const res = await axios.post('/api/users', {
          session,
        });
        setUsers(res.data.users);
        // console.log(res)
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleEdit(user) {
    setSelectedUser(user);
    setIsEditing(true);
    getUsers();
  }

  async function handleDelete(id) {
   const res = await axios.delete(`/api/users?id=${id}`);
    if(res.status !== 200){
      notify('error', 'Failed to delete user');
      return;
    }
    handleEditDone();
  }

  function handleEditDone() {
    setIsEditing(false);
    getUsers();
    notify('success', 'User deleted successfully');
  }

  return (
    <>
      {!isEditing ? (
        <div className={c.container}>
          {users.map((user) => {
            return (
              <div className={c.row} key={user._id}>
                <div className={c.userNameContainer}>
                  <span className={c.userName}>{user.name}</span>
                </div>
                <div className={c.btnContainer}>
                  <Button
                    color="primary"
                    className={c.btn}
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="red"
                    className={c.btn}
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className={`${c.container} ${c.margin}`}>
            <UserForm
              user={selectedUser}
              submitType="edit"
              onEditDone={handleEditDone}
              apiEndpoint='/api/users'
            />
            <div className={c.btnContBottom}>
              <Button
                className={c.btnBottom}
                onClick={() => setIsEditing(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
}
