import { useState } from 'react';
import Button from './Button';
import c from './Modal.module.css';

export default function Modal({
  formData,
  setFormData,
  onSubmit,
  onCloseModal,
  editEvent,
  onEditSubmit,
  onDelete,
  isEditing,
  onEdit,
  session
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  // // date format
  // function formatDate(dateString) {
  //   const [year, month, day] = dateString.split('-');
  //   return `${day}-${month}-${year}`;
  // }

  // console.log(formData);
  // console.log(session)


  function handleInput(e) {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editEvent) {
      onEditSubmit(); // calls editEventTask on Calendar
    } else {     
      onSubmit(formData);
    }
  }

  function handleCloseModal(e) {
    e.preventDefault();
    onCloseModal(false);
  }

  function handleDeleteEvent(confirm) {
    // console.log(confirm);
    if (confirm === 'yes') {
      onDelete();
    } else {
      setShowConfirm(false);
    }
  }

  function handleOpenEditor() {
    onEdit(); // calls open editor
  }

  // opens dialog for delete confirmation
  function handleDeleteWarning() {
    setShowConfirm(true);
  }

  return (
    <dialog open className={c.modal}>
      {isEditing && (
        <div className={c.modalContent}>
          <form
            className={c.form}
            // onSubmit={editEvent ? handleEditClick : handleSubmit}>
            onSubmit={handleSubmit}
          >
            <div className={c.cont}>
              <div className={c.dates}>
                <label name="start">Start Date</label>
                <input
                  name="start"
                  required
                  type="date"
                  value={formData.start}
                  onChange={handleInput}
                />
              </div>
              <div className={c.dates}>
                <label name="end">End Date</label>
                <input
                  name="end"
                  type="date"
                  value={formData.end}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className={c.cont}>
              <div className={c.dates}>
                <label name="time">Time</label>
                <input
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInput}
                />
              </div>
              <div className={`${c.dates} ${c.publicView}`}>
                <div className={c.dateItems}>
                  <label name="publicView">PublicView</label>
                  <input
                    name="publicView"
                    type="checkbox"
                    checked={formData.publicView}
                    onChange={handleInput}
                  />
                </div>

                <div className={c.dateItems}>
                  <label name="charter">Charter</label>
                  <input
                    name="charter"
                    type="checkbox"
                    checked={formData.charter}
                    onChange={handleInput}
                  />
                </div>
              </div>
            </div>

            <label name="title">Title</label>
            <input
              name="title"
              required
              type="text"
              value={formData.title}
              onChange={handleInput}
            />
            <label name="description" type="text">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInput}
            />

            <div className={c.btnContainer}>
              {editEvent ? (
                <Button type="submit">Save | Edit</Button>
              ) : (
                <Button type="submit">Submit</Button>
              )}
              <Button onClick={handleCloseModal}>Close</Button>
              {editEvent ? (
                <Button onClick={handleDeleteEvent}>Delete Event</Button>
              ) : (
                ''
              )}
            </div>

          </form>
        </div>
      )}

      {!isEditing && (
        <div className={c.taskBlockContainer}>
          
          <div className={c.taskBlockHeader}>
            
            {session && (
              <>
              <svg
                onClick={handleOpenEditor}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>

              <svg
                onClick={handleDeleteWarning}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
               >
               <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
              </>
            )}

            <svg
              onClick={handleCloseModal}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
             >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>

          <div className={c.taskBlockContent}>
            <div className={c.taskDetails}>
              <div title='Type'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6Z"
                  />
                </svg>
              </div>
              <div className={c.taskDetailsTitle}>{formData.title}</div>
            </div>
            <div className={c.taskDetails}>
              <div title='dates'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
              </div>
              <div>{formData.start}</div>
            </div>
            {session && (
              formData.charter && (
              <div className={c.taskDetails}>
                <div title='customer'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                   >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>

                <div className={`${c.taskDescription} ${c.client}`}>
                <p>{`${formData.customer.name} ${formData.customer.lastName}`}</p>
                  <p>{formData.customer.email}</p>
                  <p>{formData.customer.phone}</p>
                  <p>{formData.start}</p>
                </div>
              </div>
              )
            ) }
              <div className={c.taskDetails}>
                <div title='description'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                </div>
                <div className={c.taskDescription}>{formData.description}</div>
              </div>
     


          </div>
          {showConfirm && (
            <div className={c.confirmDelete}>
              <p>Are you sure you want to delete this task?</p>
              <div className={c.btnContainer}>
                <Button
                  onClick={() => handleDeleteEvent('yes')}
                  classname={c.btn}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => handleDeleteEvent('no')}
                  classname={c.btn}
                >
                  No
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
