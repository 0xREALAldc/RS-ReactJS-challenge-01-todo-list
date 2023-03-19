import {ChangeEvent, 
        FormEvent, 
        InvalidEvent, 
        useState,
        useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {PlusCircle, 
        ClipboardText, 
        Trash,
        Circle,
        CheckCircle } from '@phosphor-icons/react'
  
import rocketLogo from './assets/rocket.svg'
  
import styles from './App.module.css'
import './global.css'

interface Task {
  id: string;
  isFinished: boolean;
  content: string;
}

const tasks1: Task[] = [
  {
    id: 'adadasd1',
    isFinished: false,
    content: 'Get the groceries at the supermarket'
  },
  {
    id: 'adadasd2',
    isFinished: false,
    content: 'Get a present for my girlfriend'
  },
  {
    id: 'adadasd3',
    isFinished: true,
    content: 'Study for 3 hours today'
  },
  {
    id: 'adadasd4',
    isFinished: false,
    content: 'Meditate 15 minutes'
  },
];

export function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskText, setNewTaskText] = useState('')
  const [finishedTasks, setFinishedTasks] = useState(0)

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const newTask: Task = {
      id: uuidv4(),
      content: newTaskText,
      isFinished: true
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

  function deleteTask(id: string) {
    const newTasksList = tasks.filter(task => {
      if (task.id !== id){
        return task
      }
    })

    setTasks(newTasksList)
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
      <header className={styles.header}>
        <img src={rocketLogo} />
        <div>
          <strong>to</strong>
          <strong>do</strong>
        </div>
      </header>

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
                <div className={styles.task} key={task.id}>
                  <button>
                    {task.isFinished ? <CheckCircle size={24} /> : <Circle size={24} /> }
                  </button>
                  <p>{task.content}</p>
                  <button onClick={() => deleteTask(task.id)}>
                    <Trash size={24}/>
                  </button>
                </div>
              )
            })}
          </div>
        }
        
      </main>
    </div>
  )
}
