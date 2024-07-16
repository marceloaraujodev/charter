import { useState } from 'react';
import Button from '@/components/Button';
import c from './CheckList.module.css';

export default function CheckList() {
  const [tasks, setTasks] = useState(['task 1', 'task 2', 'task 3']);
  const [checkedTasks, setCheckedTasks] = useState([]); // 'task 1'

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

  return (
    <>
      <h2>CheckList</h2>
      <div className={c.btnContainer}>
        <Button>Add New</Button>
        <Button>Remove</Button>
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
            </div>
          );
        })}
      </div>

      <div className={c.checkedTasks}>
        <h3>Checked Tasks:</h3>
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
    </>
  );
}
