import styles from './Button.module.css'

interface ButtonText {
  textBtt: string
}

export function Button({textBtt}: ButtonText) {
  return (
    <div className={styles.button}>
      <button type='submit'>{textBtt}</button>
    </div>
  )
}