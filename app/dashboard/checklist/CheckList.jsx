import { useState, useEffect } from 'react';
import Button from '@/app/components/Button';
import CheckListModal from '@/app/components/CheckListModal';
import axios from 'axios';
import c from './CheckList.module.css';
import { v4 as uuidv4 } from 'uuid';

// install id generator for tasks
// change code on handlecheckbox to account for object instead of array changes

// this will come from session
const crew = 'captains';

/* tasks
        {  
      id: 'task 1',
      title: 'Task 1',
     },
      {
        id: 'task 2',
        title: 'Task 2',
       }
*/

export default function CheckList() {
  const [tasks, setTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState([]); // 'task 1';
  const [showModal, setShowModal] = useState(false);
  const [remove, setRemove] = useState(false);
  const [saved, setSaved] = useState(false);

  // useEffect(() => {
  //   getTasks();
  // }, []);

  // get tasks from server
  async function getTasks() {
    try {
      const response = await axios.get(`/api/checklist?type=${crew}`);
      setTasks(response.data.data.list);
      console.log(response.data.data.list);
      return 
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }


  // checked items functionality
  function handleCheckBox(e) {
    const isChecked = e.target.checked;
    const taskId = e.target.id;

    // if checked pushes to the checkedTasks, else removes from checkedTasks
    if (isChecked) {
      const currentTask = tasks.filter((task) => task.id === taskId);
      setCheckedTasks([...checkedTasks, ...currentTask]);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } else {
      const oldTask = checkedTasks.filter((task) => task.id === taskId);
      setTasks((prev) => [...prev, ...oldTask]);
      setCheckedTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  }

  function addTask() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  // creates new task and submits it to the tasks array
  function submitTask(task) {
    const newTask = { id: uuidv4(), title: task };
    setTasks([...tasks, newTask]);
    closeModal();
    console.log(newTask);
  }

  function deleteTask(index) {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  }

  async function saveItem() {
    console.log(tasks)
    const data = { type: crew, list: tasks}
    // do axios call to backend to save checked tasks
    const res = await axios.post('/api/checklist', data);

    if (res.status === 200) {
      console.log('Task saved successfully');
    } else {
      console.error('Error saving task');
    }
  }

  async function saveCheckedList() {
    // do axios call to backend to save checked tasks
    const res = await axios.post('/api/checklist', checkedTasks);

    if (res.status === 200) {
      console.log('Task saved successfully');
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 4000);
    } else {
      console.error('Error saving task');
      setSaved(false);
    }
  }

  return (
    <>
      <div className={c.container}>
        {showModal && (
          <CheckListModal onSubmit={submitTask} onCloseModal={closeModal} />
        )}
        {crew === 'captains' ? (
          <div className={c.titleContainer}>
            <h2 className={c.listTitle}>Captains - Post Charter</h2>
          </div>
        ) : (
          <div className={c.titleContainer}>
            <h2 className={c.listTitle}>Stew</h2>
          </div>
        )}
        <div className={c.btnContainer}>
          <Button onClick={addTask}>Add New</Button>
          <Button onClick={() => setRemove(!remove)}>
            {remove ? 'Close' : 'Remove'}
          </Button>
        </div>

        <div className={c.taskContainer}>
          {tasks.map((task, index) => {
            return (
              <div className={c.task} key={index}>
                <input
                  onChange={(e) => handleCheckBox(e)}
                  type="checkbox"
                  id={task.id}
                  checked={checkedTasks.some(
                    (checkedTask) => checkedTask.title === task.title
                  )}
                />
                <label htmlFor={task.id}></label>
                <span className={c.taskTitle}>{task.title}</span>
                {remove && (
                  <Button
                    className={c.btnDel}
                    onClick={() => deleteTask(index)}
                  >
                    delete
                  </Button>
                )}
              </div>
            );
          })}
          { tasks.length > 0 && <div className={c.btnContainer}>
            <Button onClick={saveItem}>Save</Button>
          </div>}
        </div>

        {!!checkedTasks.length && (
          <>
            <div className={c.titleContainer}>
              <h2 className={c.listTitle}>Checked Items</h2>
            </div>
            <div className={c.taskContainer}>
              <div className={c.checkedTasks}>
                {checkedTasks.map((checkedTask, index) => {
                  return (
                    <div className={c.task} key={index}>
                      <input
                        onChange={(e) => handleCheckBox(e)}
                        type="checkbox"
                        id={checkedTask.id}
                        checked
                      />
                      <label htmlFor={checkedTask.id}></label>
                      <span className={c.taskTitle}>{checkedTask.title}</span>
                    </div>
                  );
                })}
              </div>
              {saved ? (
                <p className={c.saved}>Check List Saved</p>
              ) : tasks.length === 0 ? (
                <div className={c.btnContainer}>
                  <Button onClick={saveCheckedList}>Save</Button>
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>
    </>
  );
}
