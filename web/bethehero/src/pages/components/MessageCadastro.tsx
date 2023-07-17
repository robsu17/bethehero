import { Check } from 'phosphor-react'
import styles from './MessageCadastro.module.css'

export function MessageCadastro() {
  return (
    <div className={styles.container}>
      <p className={styles.content}>
        <Check size={27} />
        Conta cadastrada com sucesso!
      </p>
    </div>
  )
}