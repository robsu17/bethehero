import { WarningCircle } from 'phosphor-react'
import styles from './Unautorized.module.css'

export function Unautorized() {
  return (
    <div className={styles.container}>
      <p className={styles.content}>
        <WarningCircle size={27} />
        E-mail já existe!
      </p>
    </div>
  )
}