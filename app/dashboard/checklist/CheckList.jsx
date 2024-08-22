'use client';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '@/app/GlobalContext';
import Button from '@/app/components/Button';
import CheckListModal from '@/app/components/CheckListModal';
import axios from 'axios';
// import { useSession } from 'next-auth/react';
import c from './CheckList.module.css';
import { v4 as uuidv4 } from 'uuid';
import Title from '@/app/components/Title';
import { list } from 'firebase/storage';

export default function CheckList({ listView }) {
  // cons
  const { 
    resetCheckList,
    listTileIsVisible, 
    setListTileIsVisible,
    displayList, 
    setDisplayList, 
    role, 
    setRole,
   } = useGlobalContext();

  const [tasks, setTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState([]); // 'task 1';
  const [showModal, setShowModal] = useState(false);
  const [remove, setRemove] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newTaskAdded, setNewTaskAdded] = useState(false);
  const [inputListName, setInputListName] = useState('');
  const [isList, setIsList] = useState(false);
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState()



  // gets Lists and clears tasks when changing from list to list
  useEffect(() => {
    setTasks([]);
    // getTasks();
    getList();
  }, [listView, resetCheckList, inputListName]);

  // save tasks to server & if tasks are added saves it
  useEffect(() => {
    if (newTaskAdded) {
      saveItem();
      setNewTaskAdded(false);
    }
  }, [tasks, newTaskAdded]);

  // sets task for the current list
  useEffect(() => {
    if (currentList && currentList.list) {
      setTasks(currentList.list);
    }
  }, [currentList]);

  // // get tasks from server
  // async function getTasks() {
  //   try {
  //     const response = await axios.get(`/api/checklist?type=${listView}`);
  //     // console.log(response.data.data);
  //     if (response.data.data) {
  //       const currentTasks = response.data.data.list;
  //       setTasks(currentTasks);
  //     } else if (!response.data.data) {
  //       // console.log('no tasks')
  //       setTasks([]);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching tasks:', error);
  //   }
  // }

  async function getList() {
    // setListTileIsVisible(true);
    try {
      const response = await axios.get(`/api/list`);
      if (response.data.lists) {
        setLists(response.data.lists);
      } else if (!response.data) {
        console.log('no tasks');
        setLists([]);
      }
    } catch (error) {
      console.error('Error fetching lists:', error);
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
    setIsList(false);
    setShowModal(false);
  }

  // creates new task after add new button -> Add is clicked
  async function submitTask(task) {
    console.log('taks', task)
    const newTask = { id: uuidv4(), title: task };
    console.log(newTask);
    setTasks((prev) => [newTask, ...prev ]);
    closeModal();
    setNewTaskAdded(true);
  }

  // when task item is created useEffect triggers this function to save the task item
  async function saveItem() {
    console.log('enter');
    try {
      // sets adding a taks to the listview which is the current user
      const data = { type: listView, list: tasks, currentListId: currentList._id };
      console.log('saveItem data variable', data)

      // do axios call to backend to save checked tasks
      const res = await axios.post('/api/checklist', data);

      // if (res.status === 200) {
      //   console.log('Task saved successfully');
      // } else {
      //   console.error('Error saving task');
      // }
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }

  async function saveCheckedList() {
    // do axios call to backend to save checked tasks
    const res = await axios.post('/api/checklist?type=checked', {
      list: checkedTasks,
      action: 'checked',
      type: 'Finished List',
    });

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

  // listview holds the user that is viewing the task
  async function deleteTask(index) {
    const item = tasks[index];
    const currentListId = currentList._id;
    console.log(item, 'currentlist id:', currentListId);
    setTasks((prev) => prev.filter((_, i) => i !== index));

    await axios.put(`/api/checklist`, { item, listId: currentListId });
  }

  function handleList(listId) {
    setCurrentList(lists.find(list => list._id == listId))
    setDisplayList(true);
    setListTileIsVisible(false)
  }

  function addNewList() {
    setShowModal(true);
    setIsList(true);
  }

  async function submitNewList() {
     const newList = {
      title: inputListName,
      type: role,
      list: [],
    };
    const res = await axios.post('/api/list', newList);

    setShowModal(false);
    setIsList(false);
    setInputListName('');
    // setRole('');
  }

  async function deleteList(listId){

    const res = await axios.delete('/api/list', {
      data: {listId}
    });
    if (res.status === 200) {
      getList();
    }else if (res.status === 404) {
      console.error('Error deleting list');
    }
  }

  return (
    <>
      <div className={c.container}>
        {showModal && (
          <CheckListModal
            onSubmit={submitTask}
            onCloseModal={closeModal}
            setInputListName={setInputListName}
            inputListName={inputListName}
            isList={isList}
            role={role}
            setRole={setRole}
            addNewList={addNewList}
            submitNewList={submitNewList}
          />
        )}

        <div className={c.titleContainer}>
          <Title
            className={c.title}
            title={currentList ? `${currentList.title.charAt(0).toUpperCase()}${currentList.title.slice(1)} Checklist` : 'Checklists'}
            center={true}
          />
        </div>

        {/* Btns display the new list remove or new taks remove btns */}
        {listView === 'admin' && displayList === false ? (
          <div className={c.btnContainer}>
            <Button onClick={() => addNewList()}>New List</Button>
            <Button onClick={() => setRemove(!remove)}>Remove List</Button>
          </div>
        ) : (
          <div className={c.btnContainer}>
            <Button onClick={addTask}>New Task</Button>
            <Button onClick={() => setRemove(!remove)}>
              {remove ? 'Close' : 'Remove'}
            </Button>
          </div>
        )}

        {/* squares icons */}
        {listTileIsVisible && (
          <div className={c.lists}>
          {lists.map((list) => {
            return (
              <div>
                <span
                  className={c.square}
                  key={list._id}
                  onClick={() => handleList(list._id)}
                >
                  {/*  {' '} */}
                  {list.title}{' '}
                </span>
                {remove && <Button onClick={() => deleteList(list._id)} className={c.btnDel} color='red'>remove</Button>}
              </div>
            );
          })}
          
        </div>
        )}

        {displayList && listView === 'admin' ? (
          null
        ) : null}

        {/* renders the list items */}
        {listView === 'admin' ? (
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
        ) : (
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
        )}

        {/* {displayList && (
          <div className={c.taskContainer}>
          {currentList.list.map((task, index) => {
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
                  <div className={c.delBtnCont}>
                    <Button
                      className={c.btnDel}
                      onClick={() => deleteTask(index)}
                    >
                      delete
                    </Button>

                  </div>
                )}
              </div>
            );
          })}
        </div>
        )} */}



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
                <div className={`${c.btnContainer} ${c.saveBtn}`}>
                  <p>Please make sure you save your List!</p>
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
