import { useState } from 'react';
import Button from './Button';
import m from './Modal.module.css'
import c from './CheckListModal.module.css';
export default function CheckListModal({onCloseModal, onSubmit}) {
  const [item, setItem] = useState();

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
      </div>100px !important;
    </dialog>
  )
}