import React, { useState } from "react"
import styles from "./Login.module.scss"
import { Input } from "../../common/Input"

export const Login: React.FC = () => {
  const [username, setUsername] = useState("")

  return (
    <form className={styles.login}>
      <Input title={"Логин"} fieldValue={username} />
    </form>
  )
}
