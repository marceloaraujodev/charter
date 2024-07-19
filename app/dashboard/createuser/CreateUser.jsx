import Button from '@/app/components/Button';
import c from './CreateUser.module.css';
export default function CreateUser() {
  return (
    <>
    {/* <div>CreateUser</div> */}
    <form className={c.form}>
      <div className={c.row}>
        <label>Name</label>
        <input type="text" placeholder="First Name" />
        <label>Last Name</label>
        <input type="text" placeholder="Last Name" />
      </div>
      <div className={c.row}>
        <label>Email</label>
        <input type="email" placeholder="Email" />
        <label>Password</label>
      <input type="password" placeholder="Password" />

      </div>
      <div className={c.row}>
      <label>Choose Type of user</label>
      <select className={c.select}>
        <option value="">Select</option>
        <option value="admin">Admin</option>
        <option value="crew">Crew</option>
        <option value="captains">Captain</option>
      </select>
      <label>Phone</label>
        <input type="number" placeholder="Phone" />
      <div className={c.btnContainer}>
       <Button className={c.btnSubmit} type="submit">Submit</Button>
      </div>
      </div>
    </form>
    </>
  )
}