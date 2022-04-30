import React from "react"
import styles from "./index.module.scss"
import { Link } from "react-router-dom"
import { ButtonColors, CustomButton } from "../../../common/CustomButton"

type AuthButtonsProps = {
  onLogin: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const AuthButtons: React.FC<AuthButtonsProps> = ({ onLogin }) => {
  return (
    <div className={styles.buttons}>
      <Link className={styles.buttons__link} to={"/register"}>
        <CustomButton
          text={"Зарегистрироваться"}
          color={ButtonColors.Green}
          style={{ padding: "0 10px" }}
        />
      </Link>
      <CustomButton
        text={"Войти"}
        onClick={onLogin}
        color={ButtonColors.Orange}
        style={{ padding: "0 30px" }}
      />
    </div>
  )
}
