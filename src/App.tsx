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

      <div className={styles.createTask}>
        <input type="text" placeholder="Add a new task"/>
        <form action="">
          <button type="submit">
            Criar +
          </button>
        </form>
      </div>
    </div>
  )
}
