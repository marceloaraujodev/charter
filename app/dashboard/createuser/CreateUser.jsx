import UserForm from '../userForm/UserForm';
import c from './CreateUser.module.css';
export default function CreateUser() {

  return (
    <>
     <UserForm 
      submitType='register'
      method='post'
      apiEndpoint='/api/register'
     />
    </>
  );
}
