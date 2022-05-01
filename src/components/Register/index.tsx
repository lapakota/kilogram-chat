import React, { useState } from "react"
import styles from "./index.module.scss"
import { Input } from "../../common/Input"
import { register } from "../../api/register"
import { useNavigate } from "react-router-dom"
import { ButtonColors, CustomButton } from "../../common/CustomButton"

export const Register: React.FC = () => {
  const [userLogin, setUserLogin] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userName, setUserName] = useState("")
  const [isUserExist, setIsUserExist] = useState(false)
  const [isIncorrectInput, setIsIncorrectInput] = useState(false)
  const router = useNavigate()

  const createUser = () => {
    if (!userLogin || !userPassword || !userName) {
      setIsIncorrectInput(true)
      setIsUserExist(false)
      return
    }
    register(userLogin, userPassword, userName).then((x) => {
      if (x.register === null) {
        setIsUserExist(true)
        setIsIncorrectInput(false)
      } else {
        router("/")
      }
    })
  }
  return (
    <form className={styles.register}>
      {isIncorrectInput && <p>Некорректный ввод</p>}
      {isUserExist && <p>Пользователь с таким логином существует</p>}
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
      <Input
        title={"Имя"}
        value={userName}
        onValueChange={setUserName}
        placeholder={"Введите имя..."}
      />
      <CustomButton
        text={"Создать"}
        onClick={createUser}
        color={ButtonColors.Orange}
        style={{ width: "100%", marginTop: "19px" }}
      />
    </form>
  )
}
