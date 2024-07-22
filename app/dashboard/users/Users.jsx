import { useState, useEffect } from 'react';
import UserForm from '../userForm/UserForm';
import Button from '@/app/components/Button';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import c from './Users.module.css';

export default function Users({ view }) {
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: session } = useSession();

  // console.log(session)
  // console.log(view)
  // console.log(session.user.email);

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
    console.log(id);

    const res = await axios.delete(`/api/users?id=${id}`);
    console.log(`/api/users?id=${id}`);
    getUsers();
    console.log(res);
  }

  function handleEditDone() {
    setIsEditing(false);
    getUsers();
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
    </>
  );
}
