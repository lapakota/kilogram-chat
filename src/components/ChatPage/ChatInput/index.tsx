import styles from "../index.module.scss"
import React, { useState } from "react"
import { sendMessage } from "../../../api/services/chat"
import Chat from "../../../models/Chat"
import { useAppSelector } from "../../../hooks"

type InputProps = {
  chat: Chat | undefined
  onSendMessage: () => void
}

const MAX_MESSAGE_LENGTH = 2500

const ChatInput = ({ chat, onSendMessage }: InputProps) => {
  const [messageText, setMessageText] = useState("")

  const token = useAppSelector((state) => state.user.token)

  if (!chat) return null

  const updateMessageText = (text: string) => {
    if (text.length > MAX_MESSAGE_LENGTH)
      text = messageText.slice(0, MAX_MESSAGE_LENGTH)
    setMessageText(text)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      if (messageText === "") {
        return
      }

      sendMessage(chat.id, messageText, token).then(() => {
        setMessageText("")
        onSendMessage()
      })
    }
  }

  return (
    <form className={styles.chatPage__form}>
      <input
        className={styles.chatPage__input}
        type="text"
        placeholder="Введите сообщение..."
        onChange={(e) => updateMessageText(e.target.value)}
        value={messageText}
        onKeyDown={(e) => onKeyDown(e)}
      />
    </form>
  )
}
export default ChatInput
