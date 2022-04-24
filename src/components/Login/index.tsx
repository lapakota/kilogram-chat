import React, { useState } from "react"
import styles from "./index.module.scss"
import { Input } from "../../common/Input"
import { AuthButtons } from "./AuthButtons"
import { auth } from "../../api/auth"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../hooks"
import { addToken, login } from "../../store/slices/userSlice"

export const Login: React.FC = () => {
  const [userLogin, setUserLogin] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [isErrorLogin, setIsErrorLogin] = useState(false)
  const router = useNavigate()
  const dispatch = useAppDispatch()

  const onLogin = async () => {
    auth(userLogin, userPassword).then((x) => {
      console.log(x)
      if (x.signIn !== null) {
        router("/chat")
        dispatch(addToken(x.signIn))
        dispatch(login(userLogin))
      } else {
        setIsErrorLogin(true)
      }
    })
  }

  return (
    <form className={styles.login}>
      {isErrorLogin && <p>Неверный логин или пароль</p>}
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
