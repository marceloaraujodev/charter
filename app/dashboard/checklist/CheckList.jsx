import { useState } from 'react';
import Button from '@/components/Button';
import CheckListModal from '@/components/CheckListModal';
import axios from 'axios';
import c from './CheckList.module.css';

export default function CheckList() {
  const [tasks, setTasks] = useState(['task 1', 'task 2', 'task 3']);
  const [checkedTasks, setCheckedTasks] = useState([]); // 'task 1';
  const [showModal, setShowModal] = useState(false);
  const [remove, setRemove] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleCheckBox(e) {
    const isChecked = e.target.checked;
    const taskId = e.target.id;

    console.log(taskId)

    if (isChecked) {
      setCheckedTasks([...checkedTasks, taskId]);
      setTasks((prev) => prev.filter((t) => t !== taskId));
    } else {
      setTasks((prev) => [...prev, taskId]);
      setCheckedTasks((prev) => prev.filter((t) => t!== taskId));
    }
  }

  function addTask(){
    setShowModal(true);
  }

  function closeModal(){
    setShowModal(false);
  }

  function submitTask(task){
    setTasks([...tasks, task]);
    closeModal();
    console.log(task)
  }

  function deleteTask(index){
    console.log(index)
    setTasks((prev) => prev.filter((_, i) => i !== index));
  }

  async function saveCheckedList(){
    // do axios call to backend to save checked tasks
    const res = await axios.post('/api/checklist', checkedTasks);

    if(res.status === 200){
      console.log('Task saved successfully');
      setSaved(true);
      setTimeout(() => {
        setSaved(false)
      }, 4000);
    } else {
      console.error('Error saving task');
      setSaved(false);
    }
    
  }

  return (
    <>
    <div className={c.container}>

      {showModal && <CheckListModal onSubmit={submitTask} onCloseModal={closeModal} />}
      <h2>CheckList</h2>
      <div className={c.btnContainer}>
        <Button onClick={addTask}>Add New</Button>
        <Button onClick={() => setRemove(!remove)}>{remove ? 'Close' : 'Remove'}</Button>
      </div>

      <div className={c.taskContainer}>
        {tasks.map((task, index) => {
          return (
            <div className={c.task} key={index}>
              <input
                onChange={(e) => handleCheckBox(e)}
                type="checkbox"
                id={task}
                checked={checkedTasks.includes(task)}
              />
              <label htmlFor={task}></label>
              <span className={c.taskTitle}>{task}</span>
              {remove && (
                <Button className={c.btnDel} onClick={() => deleteTask(index)}>delete</Button>
              )}
            </div>
          );
        })}
      </div>

      {!!checkedTasks.length && (
              <div className={c.taskContainer}>
              <div className={c.checkedTasks}>
                <h2>Checked Tasks:</h2>
                {checkedTasks.map((checkedTask, index)=>{
                  return(
                    <div className={c.task} key={index}>
                      <input
                        onChange={(e) => handleCheckBox(e)}
                        type="checkbox"
                        id={checkedTask}
                        checked
                      />
                      <label htmlFor={checkedTask}></label>
                      <span className={c.taskTitle}>{checkedTask}</span>
                    </div>
                  )
                })}
              </div>
                {saved ? (<p className={c.saved}>Check List Saved</p>) : (<Button onClick={saveCheckedList}>Save</Button>)}
            </div>
      )}

    </div>
    </>
  );
}
