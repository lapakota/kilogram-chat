import React, { useState } from "react"
import styles from "./index.module.scss"
import { Input } from "../../common/Input"

export const Register: React.FC = () => {
  const [userLogin, setUserLogin] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userName, setUserName] = useState("")

  const createUser = () => {}

  return (
    <form className={styles.register}>
      <Input title={"Логин"} value={userLogin} onValueChange={setUserLogin} />
      <Input
        title={"Пароль"}
        value={userPassword}
        onValueChange={setUserPassword}
        type={"password"}
      />
      <Input title={"Имя"} value={userName} onValueChange={setUserName} />
      <button className={styles.register__createUserButton} onClick={createUser}>
        Создать
      </button>
    </form>
  )
}
