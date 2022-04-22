import React, { Dispatch, SetStateAction } from "react"
import styles from "./Input.module.scss"

type InputProps = {
  title: string
  value: string
  onValueChange: Dispatch<SetStateAction<string>>
  type?: string
}

export const Input: React.FC<InputProps> = ({
  title,
  value,
  onValueChange,
  type = "text",
}) => {
  return (
    <section className={styles.input}>
      <h2 className={styles.input__title}>{title}</h2>
      <input
        className={styles.input__field}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        type={type}
      />
    </section>
  )
}
