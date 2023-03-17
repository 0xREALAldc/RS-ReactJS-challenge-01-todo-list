import { PlusCircle, ClipboardText } from '@phosphor-icons/react'

import styles from './App.module.css'

import rocketLogo from './assets/rocket.svg'

import './global.css'

export function App() {
  return (
    <div>
      <header className={styles.header}>
        <img src={rocketLogo} />
        <div>
          <strong>to</strong>
          <strong>do</strong>
        </div>
      </header>

      <form className={styles.taskForm}>
        <input type="text" placeholder="Add a new task"/>
      
        <button type="submit">
          Criar
          <PlusCircle/>
        </button>
      </form>

      <main className={styles.taskList}>
        <div className={styles.taskListInfo}>
          <p>Tasks created <span>0</span></p>
          <p>Finished <span>0</span></p>
        </div>

        <div className={styles.taskListItems}>
          <ClipboardText size={56}/>
          <div>
            <strong>You still don't have any tasks</strong>
            <p>Create a new task and organize your daily life</p>
          </div>
        </div>
      </main>
    </div>
  )
}
