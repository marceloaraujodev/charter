import Button from './Button';
import c from './ModalG.module.css';

export default function ModalG({
  children,
  onSubmit,
  onCloseModal,
  submitButtonLable = 'Submit',
}) {
  
  function handleCloseModal() {
    onCloseModal();
  }

  return (
    <>
      <dialog open className={c.modal}>
        <div className={c.modalContent}>
          <form className={c.form} onSubmit={onSubmit}>
            {children}
            <div className={c.btnContainer}>
            <Button className={c.btn} type="submit">
                {submitButtonLable}
              </Button>
              <Button className={c.btn} onClick={handleCloseModal}>
                Close
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
