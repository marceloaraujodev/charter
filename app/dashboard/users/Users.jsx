import { useState, useEffect } from "react";
import EditUser from '../createuser/CreateUser'
import Button from "@/app/components/Button";
import axios from "axios";
import { useSession } from 'next-auth/react';
import c from './Users.module.css';

export default function Users() {
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const { data: session } = useSession();

  console.log(session)

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

  return (
    <>
    {!isEditing ? (    
      <div className={c.container}>
        {users.map(user => {
          return (
            <div className={c.row} key={user.id}>
              <div className={c.userName}>{user.name}</div>
              <div className={c.btnContainer}>
                <Button color='primary' className={c.btn} onClick={() => setIsEditing(true)}>Edit</Button> 
                <Button color="red" className={c.btn} onClick={() => deleteUser(user.id)}>Delete</Button>
              </div>
            </div>
          )
        })}
    </div>) : <>
    <div className={c.container}>
      <EditUser  />
      <Button className={c.btn} onClick={() => setIsEditing(false)}>Close</Button>
    </div>
     </>}
    </>
  )
}