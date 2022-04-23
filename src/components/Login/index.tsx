import React, { useState } from "react"
import styles from "./index.module.scss"
import { Input } from "../../common/Input"
import { AuthButtons } from "./AuthButtons"

export const Login: React.FC = () => {
  const [userLogin, setUserLogin] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const onLogin = () => {}

  return (
    <form className={styles.login}>
      <Input title={"Логин"} value={userLogin} onValueChange={setUserLogin} />
      <Input
        title={"Пароль"}
        value={userPassword}
        onValueChange={setUserPassword}
        type={"password"}
      />
      <AuthButtons onLogin={onLogin} />
    </form>
  )
}
