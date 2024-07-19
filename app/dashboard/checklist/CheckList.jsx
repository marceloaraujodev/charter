import { useState, useEffect } from 'react';
import Button from '@/app/components/Button';
import CheckListModal from '@/app/components/CheckListModal';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import c from './CheckList.module.css';
import { v4 as uuidv4 } from 'uuid';

// figure it out how to get the crew to display captains or stews list and if  none of them display all.

// maybe create a page for the lists if the user is a admin.

function upperCase(crew) {
  return crew.charAt(0).toUpperCase() + crew.slice(1)
}

export default function CheckList() {
  const [tasks, setTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState([]); // 'task 1';
  const [showModal, setShowModal] = useState(false);
  const [remove, setRemove] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newTaskAdded, setNewTaskAdded] = useState(false);
  const { data: session } = useSession();

  // this will come from session
const crew = 'captains';

  // populates tasks on mount
  useEffect(() => {
    getTasks();
  }, []);

  // save tasks to server & if tasks are added saves it 
  useEffect(() => {
    if(newTaskAdded){
      saveItem();
      setNewTaskAdded(false);
    }
  }, [tasks, newTaskAdded]);

  // get tasks from server
  async function getTasks() {
    try {
      const response = await axios.get(`/api/checklist?type=${crew}`);
      if(response.data.data){
        const currentTasks = response.data.data.list;
        setTasks(currentTasks);
      }
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

  // display modal when addTask button is clicked
  function addTask() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  // creates new task after add new button -> Add is clicked
  async function submitTask(task) {
    const newTask = { id: uuidv4(), title: task };
    setTasks((prev) => [...prev, newTask]);
    closeModal();
    setNewTaskAdded(true);
  }

  async function saveItem() {
    console.log('enter')
    try {
      const data = { type: crew, list: tasks}
      // console.log('saveItem data variable', data)
  
      // do axios call to backend to save checked tasks
      const res = await axios.post('/api/checklist', data);
  
      if (res.status === 200) {
        console.log('Task saved successfully');
      } else {
        console.error('Error saving task');
      }
      
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }

  async function saveCheckedList() {
    // do axios call to backend to save checked tasks
    const res = await axios.post('/api/checklist?type=checked', { list: checkedTasks, action: 'checked', type: 'Finished List'});

    if (res.status === 200) {
      console.log('Task saved successfully');
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setCheckedTasks([]);
      }, 4000);
    } else {
      console.error('Error saving task');
      setSaved(false);
    }
  }

  function deleteTask(index) {
    const item = tasks[index];
    setTasks((prev) => prev.filter((_, i) => i !== index));
    // console.log(item);
    axios.put(`/api/checklist`, { item, type: crew });
  }

  return (
    <>
      <div className={c.container}>
        {showModal && (
          <CheckListModal onSubmit={submitTask} onCloseModal={closeModal} />
        )}
        {crew === 'captains' ? (
          <div className={c.titleContainer}>
            <h2 className={c.listTitle}>{upperCase(crew)} - Post Charter</h2>
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
