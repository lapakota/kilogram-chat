import styles from "./index.module.scss"
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { CHATS_TYPES } from "../../config"
import { Input } from "../../common/Input"
import { createChat, getAllChats, getAllUsers } from "../../api/services/chat"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { setUsers } from "../../store/slices/usersSlice"
import { setChats } from "../../store/slices/chatsSlice"
import { CustomModal } from "../../common/CustomModal"
import { ButtonColors, CustomButton } from "../../common/CustomButton"

interface CreateChatProps {
  creatingChat: boolean
  setIsCreatingChat: Dispatch<SetStateAction<boolean>>
}

export const CreateChatModal: React.FC<CreateChatProps> = ({
  creatingChat,
  setIsCreatingChat,
}) => {
  const members = useRef<string[]>([])
  const [chatName, setChatName] = useState("")
  const [chatType, setChatType] = useState<string>(CHATS_TYPES.CHANNEL)
  const [nameMember, setNameMember] = useState("")
  const [isErrorSearchUser, setIsErrorSearchUser] = useState(false)
  const [isAddedUser, setIsUserAdded] = useState(false)
  const [isErrorInput, setIsErrorInput] = useState(false)

  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.user)
  const token = user.token

  const usersNames = useAppSelector((state) =>
    state.users.users.map((x) => x.login).filter((x) => x !== user.login)
  )

  const addMember = () => {
    if (nameMember.trim().length === 0) return

    setIsUserAdded(false)
    setIsErrorSearchUser(false)
    if (usersNames.includes(nameMember)) {
      if (!members.current.includes(nameMember)) {
        members.current.push(nameMember)
        setNameMember("")
      } else {
        setIsUserAdded(true)
      }
    } else {
      setIsErrorSearchUser(true)
    }
  }

  const onCreateChat = () => {
    if (chatName) {
      createChat(chatName, chatType, members.current, token).then((x) => {
        if (x !== null) {
          setIsCreatingChat(false)
          getAllChats(token).then((data) => dispatch(setChats(data.chats)))
        } else {
          setIsErrorInput(true)
        }
      })
    } else {
      setIsErrorInput(true)
    }
  }

  useEffect(() => {
    getAllUsers().then((data) => dispatch(setUsers(data.users)))
  }, [dispatch])

  return (
    <CustomModal isOpen={creatingChat}>
      <form className={styles.createChat}>
        {isErrorInput && (
          <p style={{ color: "white" }}>
            Неверный ввод или данный чат уже существует
          </p>
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
          {isAddedUser && (
            <p style={{ color: "white" }}>Пользователь уже в списке</p>
          )}
          <Input
            title="Имя"
            value={nameMember}
            onValueChange={setNameMember}
            placeholder="Имя участника"
            onEnter={addMember}
          />
          <ul className={styles.listMembers}>
            {members.current.map((member) => (
              <li key={member}>{member}</li>
            ))}
          </ul>
        </div>
        <div className={styles.buttons}>
          <CustomButton
            text={"Отменить"}
            onClick={() => setIsCreatingChat(false)}
            color={ButtonColors.Green}
            style={{ width: "100%" }}
          />
          <CustomButton
            text={"Создать"}
            onClick={onCreateChat}
            color={ButtonColors.Orange}
            style={{ width: "100%" }}
          />
        </div>
      </form>
    </CustomModal>
  )
}
