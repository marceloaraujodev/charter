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
                <Button color="red" className={c.btn}>Delete</Button>
              </div>
            </div>
          )
        })}
    </div>) : <>
    <div className={`${c.container} ${c.margin}`}>
      <UserForm user={selectedUser} submitType='edit' />
      <Button className={c.btn} onClick={() => setIsEditing(false)}>Close</Button>
    </div>
     </>}
    </>
  )
}