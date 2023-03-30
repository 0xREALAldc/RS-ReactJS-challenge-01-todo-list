import styles from './Header.module.css'

import rocketLogo from './assets/rocket.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={rocketLogo} />
      <div>
        <strong>to</strong>
        <strong>do</strong>
      </div>
    </header>
  )
}