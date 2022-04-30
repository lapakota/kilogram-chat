import React, { Dispatch, SetStateAction } from "react"
import styles from "./index.module.scss"

type InputProps = {
  title: string
  value: string
  onValueChange: Dispatch<SetStateAction<string>>
  placeholder?: string
  type?: string
  onEnter?: () => void
}

export const Input: React.FC<InputProps> = ({
  title,
  value,
  onValueChange,
  placeholder = "",
  type = "text",
  onEnter = () => {},
}) => {
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === "Enter" && onEnter()
  }

  return (
    <section className={styles.input}>
      <h2 className={styles.input__title}>{title}</h2>
      <input
        className={styles.input__field}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        onKeyDown={onKeyDown}
      />
    </section>
  )
}
