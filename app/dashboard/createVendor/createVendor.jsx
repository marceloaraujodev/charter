import UserForm from "../userForm/UserForm";
import Users from "../users/Users";
export default function CreateVendor({view}) {
  console.log(view)

  return (
    <>

    {/* <Users view={view} /> */}
     {/* <Users view={view} /> */}
      <UserForm 
        submitType='register' 
        apiEndpoint='/api/vendors'
        method='post'
        onEditDone={()=> console.log('vendor registered') }
        view={view}
      />
    </>
  )
}