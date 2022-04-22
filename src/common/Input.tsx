import React from "react"
import styles from "./Input.module.scss"

type InputProps = {
  title: string
  fieldValue: string
}

export const Input: React.FC<InputProps> = ({ title, fieldValue }) => {
  return (
    <section className={styles.input}>
      <h2 className={styles.input__title}>{title}</h2>
      <input className={styles.input__field} value={fieldValue} />
    </section>
  )
}