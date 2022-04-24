import styles from "../index.module.scss"
import React, { useState } from "react"
import { sendMessage } from "../../../api/services/chat"
import Chat from "../../../models/Chat"

type InputProps = {
  chat: Chat | undefined
  onSendMessage: () => void
}

const ChatInput = ({ chat, onSendMessage }: InputProps) => {
  const [messageText, setMessageText] = useState("")
  if (!chat) return null;

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      if (messageText === ""){
        return;
      }
      sendMessage(chat.id, messageText).then(() => {
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
        onChange={(e) => setMessageText(e.target.value)}
        value={messageText}
        onKeyDown={(e) => onKeyDown(e)}
      />
    </form>
  )
}
export default ChatInput
