import { useState } from 'react';
import Button from './Button';
import m from './Modal.module.css'
import c from './CheckListModal.module.css';
export default function CheckListModal({onCloseModal, onSubmit}) {
  const [item, setItem] = useState();
  // const [listName, setListName] = useState('');
  // const [role, setRole] = useState('');

  function handleCloseModal() {
    onCloseModal();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (item) {
      onSubmit(item);
    } else {
      alert('Please enter an item');
    }
  }

  function handleSubmitNewList(e){
    e.preventDefault();
  }

  return (
    <dialog open className={m.modal}>
      <div className={m.modalContent}>
        <form className={m.form} onSubmit={handleSubmit}>
          <label htmlFor="item">New Item:</label>
          <textarea className={c.textarea} type="text" placeholder="Enter item" value={item} onChange={(e) => setItem(e.target.value)} />
          <div className={m.btnContainer}>
            <Button className={c.btn} type="submit">Add</Button>
            <Button className={c.btn} onClick={handleCloseModal}>Close</Button>
          </div>
        </form>
      </div>
    </dialog>

  //   // this will be for creating a new list
  // <dialog open className={m.modal}>
  //     <div className={m.modalContent}>
  //     <form className={m.form} onSubmit={handleSubmitNewList}>
  //       <label htmlFor="list">New List:</label>
  //       <input type="text" placeholder="Enter List Name" value={listName} onChange={(e) => setListName(e.target.value)} />

  //       <select
  //             className={c.select}
  //             onChange={(e) => setRole(e.target.value)}
  //             value={role}
  //           >
  //             <option value="">Select</option>
  //             <option value="admin">Admin</option>
  //             <option value="crew">Crew</option>
  //             <option value="captain">Captain</option>
  //           </select>

  //       <div className={m.btnContainer}>
  //         <Button className={c.btn} type="submit">Add</Button>
  //         <Button className={c.btn} onClick={handleCloseModal}>Close</Button>
  //       </div>
  //     </form>
  //   </div>
  // </dialog>
  )
}