import styles from './Input.module.css'

interface InputInterface{
  placeholder: string
}

export function Input({placeholder}: InputInterface) {
  return (
    <div className={styles.input}>
      <input type="text" placeholder={placeholder} />
    </div>
  )
}