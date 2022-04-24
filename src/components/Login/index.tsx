import React, { useState } from "react"
import styles from "./index.module.scss"
import { Input } from "../../common/Input"
import { AuthButtons } from "./AuthButtons"

export const Login: React.FC = () => {
  const [userLogin, setUserLogin] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const onLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }

  return (
    <form className={styles.login}>
      <Input
        title={"Логин"}
        value={userLogin}
        onValueChange={setUserLogin}
        placeholder={"Введите логин..."}
      />
      <Input
        title={"Пароль"}
        value={userPassword}
        onValueChange={setUserPassword}
        type={"password"}
        placeholder={"Введите пароль..."}
      />
      <AuthButtons onLogin={onLogin} />
    </form>
  )
}
