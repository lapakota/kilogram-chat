import styles from "./index.module.scss"
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { CHATS_TYPES } from "../../config"
import { Input } from "../../common/Input"
import { createChat, getAllUsers } from "../../api/services/chat"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { setUsers } from "../../store/slices/usersSlice"

interface createChatProps {
  setIsCreateChat: Dispatch<SetStateAction<boolean>>
}

export const CreateChat: React.FC<createChatProps> = ({ setIsCreateChat }) => {
  const [chatName, setChatName] = useState("")
  const members = useRef<string[]>([])
  const [chatType, setChatType] = useState<string>(CHATS_TYPES.CHANNEL)
  const [nameMember, setNameMember] = useState("")
  const [isErrorSearchUser, setIsErrorSearchUser] = useState(false)
  const dispatch = useAppDispatch()
  const usersNames = useAppSelector((state) => state.users.users.map((x) => x.login))
  const [isAddedUser, setIsAddedUser] = useState(false)
  const [isErrorInput, setIsErrorInput] = useState(false)
  const token = useAppSelector((state) => state.user.token)

  const addMember = () => {
    setIsAddedUser(false)
    setIsErrorSearchUser(false)
    if (usersNames.includes(nameMember)) {
      if (!members.current.includes(nameMember)) {
        members.current.push(nameMember)
        setNameMember("")
      } else {
        setIsAddedUser(true)
      }
    } else {
      setIsErrorSearchUser(true)
    }
  }

  const onClick = () => {
    if (chatName) {
      createChat(chatName, chatType, members.current, token).then((_) => {
        setIsCreateChat(false)
      })
    } else {
      setIsErrorInput(true)
    }
  }

  useEffect(() => {
    getAllUsers().then((data) => dispatch(setUsers(data.users)))
  }, [])

  return (
    <form className={styles.createChat}>
      {isErrorInput && (
        <p style={{ color: "white" }}>Неверный ввод или данный чат уже существует</p>
      )}
      <Input
        title="Название"
        value={chatName}
        onValueChange={setChatName}
        placeholder="Название чата..."
      />
      <select
        value={chatType}
        onChange={(e) => setChatType(e.target.value)}
        placeholder="Тип чата"
        className={styles.selectorTypes}
      >
        <option value={CHATS_TYPES.CHANNEL}>Канал</option>
        <option value={CHATS_TYPES.GROUP}>Группа</option>
        <option value={CHATS_TYPES.PRIVATE}>Приватный чат</option>
      </select>
      <div className={styles.memberAdd}>
        {isErrorSearchUser && (
          <p style={{ color: "white" }}>Пользователь не найден</p>
        )}
        {isAddedUser && <p style={{ color: "white" }}>Пользователь уже в списке</p>}
        <Input
          title="Имя"
          value={nameMember}
          onValueChange={setNameMember}
          placeholder="Имя участника"
        />
        <button type="button" onClick={addMember}>
          Добавить
        </button>
        <ul className={styles.listMembers}>
          {members.current.map((member) => (
            <li key={member}>{member}</li>
          ))}
        </ul>
      </div>
      <div className={styles.buttons}>
        <button type="button" onClick={onClick}>
          Создать чат
        </button>
        <button type="button" onClick={() => setIsCreateChat(false)}>
          Назад
        </button>
      </div>
    </form>
  )
}
