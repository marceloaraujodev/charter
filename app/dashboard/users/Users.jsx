import { useState, useEffect } from "react";
import UserForm from '../userForm/UserForm';
import Button from "@/app/components/Button";
import axios from "axios";
import { useSession } from 'next-auth/react';
import c from './Users.module.css';

export default function Users() {
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: session } = useSession();

  // console.log(session)
  // console.log(session.user.email);

  useEffect(() => {
    getUsers();
  }, []);
  
  async function getUsers() {
    try {
      const res = await axios.post('http://localhost:3000/api/users', {
        session
      });
  
      setUsers(res.data.users);
    
    } catch (error) {
      console.log(error)
    }
  }

  function handleEdit(user){
    // console.log(user)
    setSelectedUser(user);
    setIsEditing(true);
    getUsers();

  }

  async function handleDelete(id){
    console.log(id)

      const res = await axios.delete(`http://localhost:3000/api/users?id=${id}`)
      console.log(`http://localhost:3000/api/users?id=${id}`)
      getUsers();
      console.log(res)
  }

  function handleEditDone() {
    setIsEditing(false);
    getUsers();
  }

  return (
    <>
    {!isEditing ? (    
      <div className={c.container}>
        {users.map(user => {
          return (
            <div className={c.row} key={user._id}>
              <div className={c.userName}>{user.name}</div>
              <div className={c.btnContainer}>
                <Button color='primary' className={c.btn} onClick={() => handleEdit(user)}>Edit</Button> 
                <Button 
                  color="red" 
                  className={c.btn}
                  onClick={() => handleDelete(user._id)}
                >Delete</Button>
              </div>
            </div>
          )
        })}
    </div>) : <>
    <div className={`${c.container} ${c.margin}`}>
      <UserForm user={selectedUser} submitType='edit' onEditDone={handleEditDone} />
      <Button className={c.btn} onClick={() => setIsEditing(false)}>Close</Button>
    </div>
     </>}
    </>
  )
}