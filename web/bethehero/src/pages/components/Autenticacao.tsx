import { WarningCircle } from 'phosphor-react'
import styles from './Autenticacao.module.css'

export function Autenticacao() {
  return (
    <div className={styles.container}>
      <p className={styles.content}>
      <WarningCircle size={27} />
        ID INCORRETO!
      </p>
    </div>
  )
}