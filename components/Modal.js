import c from './Modal.module.css'

export default function Modal({formData, setFormData, onSubmit}) {

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

  return (
    <dialog open className={c.modal}>
      <div className={c.modalContent}>
        <form className={c.form} onSubmit={handleSubmit}>
          <label name='start'>Start Date</label>
          <input name='start' type='date' value={formData.date} onChange={handleInput}/>
          <label name='end'>End Date</label>
          <input name='end' type='date' value={formData.date} onChange={handleInput}/>
          <label name='title'>Title</label>
          <input name='title' type='text' value={formData.title} onChange={handleInput}/>
          <label name='description' type='text'>Description</label>
          <textarea type='text' name='description' value={formData.description} onChange={handleInput}/>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </dialog>
  )
}
