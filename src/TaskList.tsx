import { 
  ChangeEvent, 
  FormEvent, 
  InvalidEvent, 
  useState,
  useEffect } from 'react'
  
import { 
  PlusCircle,
  ClipboardText } from '@phosphor-icons/react';
import { v4 as uuidv4 } from 'uuid';

import styles from './TaskList.module.css'
import { TaskItem } from './TaskItem';

export interface Task {
  id: string;
  isFinished: boolean;
  content: string;
}

export function TaskList () {
  const [newTaskText, setNewTaskText] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [finishedTasks, setFinishedTasks] = useState(0)

  function deleteTask(id: string) {
    const newTasksList = tasks.filter(task => {
      if (task.id !== id){
        return task
      }
    })

    setTasks(newTasksList)
  }

  function checkTask(id: string) {
    const newTaskList = tasks.filter(task => {
      if (task.id === id) {
        task.isFinished = !task.isFinished
        return task
      }
      else {
        return task
      }
    })

    setTasks(newTaskList)
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const newTask: Task = {
      id: uuidv4(),
      content: newTaskText,
      isFinished: false
    }

    setTasks([...tasks, newTask])
    setNewTaskText('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTaskText(event.target.value)
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Please fill in the task')
  }

  useEffect(() => {
    const finishedCount = tasks.filter(({ isFinished }) => isFinished)
      .reduce<number>((sum: number, task) => {
        return sum + 1
      }, 0)

    setFinishedTasks(finishedCount)
  }, [tasks])

  return (
    <div>
      <form className={styles.taskForm} onSubmit={handleCreateNewTask}>
        <input 
          type="text" 
          placeholder="Add a new task"
          value={newTaskText}
          onChange={handleNewTaskChange}
          onInvalid={handleNewTaskInvalid}
          required
        />
      
        <button type="submit">
          Criar
          <PlusCircle size={16}/>
        </button>
      </form>

      <main className={styles.taskList}>
        <div className={styles.taskListInfo}>
          <p>Tasks created <span>{tasks.length}</span></p>
          <p>Finished <span>{finishedTasks} of {tasks.length}</span></p>
        </div>

        { tasks.length === 0 
          ?
          <div className={`${styles.taskListItems} ${styles.taskListItemsEmpty} `}>
            <ClipboardText size={56}/>
            <div>
              <strong>You still don't have any tasks</strong>
              <p>Create a new task and organize your daily life</p>
            </div>
          </div>
          :
          <div className={styles.taskListItems}>
            { tasks.map(task => {
              return (
                <TaskItem 
                  key={task.id}
                  {...task}
                  onCheckTask={checkTask}
                  onDeleteTask={deleteTask}
                />
              )
            })}
          </div>
        }
      </main>
    </div>
  )
}