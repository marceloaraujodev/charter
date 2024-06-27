import c from './Modal.module.css'

export default function Modal({
  formData, 
  setFormData, 
  onSubmit, 
  onCloseModal, 
  editEvent,  
  onEditSubmit, 
  onDelete,
}) {
  
  function handleInput(e){
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleSubmit(e){
    e.preventDefault();
      onSubmit(formData)
  }

  function handleCloseModal(){
    onCloseModal(false)
  }

function handleEditClick(e){
  e.preventDefault();
  onEditSubmit(); // calls editEventFunction on Calendar
}

function handleDeleteEvent(){
  onDelete();
}

  return (
    <dialog open className={c.modal}>
      <div className={c.modalContent}>
        <form className={c.form}  onSubmit={editEvent ? handleEditClick : handleSubmit}>
        
         <div className={c.cont}>
            <div className={c.dates}>
              <label name='start'>Start Date</label>
              <input name='start' type='date' value={formData.date} onChange={handleInput}/>
            </div>
            <div className={c.dates}>
              <label name='end'>End Date</label>
              <input name='end' type='date' value={formData.date} onChange={handleInput}/>
            </div>
         </div>

          <label name='title'>Title</label>
          <input name='title' type='text' value={formData.title} onChange={handleInput}/>
          <label name='description' type='text'>Description</label>
          <textarea type='text' name='description' value={formData.description} onChange={handleInput}/>
          {editEvent ? <button type='submit'>Save</button> : <button type='submit' >Submit</button>}
          <button onClick={handleCloseModal}>Close</button>
          {editEvent ? <button onClick={handleDeleteEvent}>Delete Event</button> : ''}
        </form>
      </div>
    </dialog>
  )
}
