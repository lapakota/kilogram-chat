import React, { useState } from "react"
import styles from "./index.module.scss"
import { Input } from "../../common/Input"
import { AuthButtons } from "./AuthButtons"
import { auth } from "../../api/auth"
import { useNavigate } from "react-router-dom"
import { setToken, login } from "../../store/slices/userSlice"
import { useAppDispatch } from "../../hooks"

export const Login: React.FC = () => {
  const [userLogin, setUserLogin] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [isErrorLogin, setIsErrorLogin] = useState(false)
  const router = useNavigate()
  const dispatch = useAppDispatch()

  const onLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    auth(userLogin, userPassword).then((x) => {
      if (x.signIn !== null) {
        dispatch(setToken(x.signIn))
        dispatch(login(userLogin))
        router("/chat")
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
