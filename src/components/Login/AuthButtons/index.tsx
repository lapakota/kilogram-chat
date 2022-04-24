import React from "react"
import styles from "./index.module.scss"
import cn from "classnames"
import { Link } from "react-router-dom"

type AuthButtonsProps = {
  onLogin: () => void
}

export const AuthButtons: React.FC<AuthButtonsProps> = ({ onLogin }) => {
  return (
    <div className={styles.buttons}>
      <Link className={styles.buttons__link} to={"/register"}>
        <button
          className={cn(styles.buttons__element, styles.buttons__register)}
          type="button"
        >
          Зарегистрироваться
        </button>
      </Link>
      <button
        className={cn(styles.buttons__element, styles.buttons__login)}
        onClick={onLogin}
        type="button"
      >
        Войти
      </button>
    </div>
  )
}
