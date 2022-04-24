import styles from "./index.module.scss"
import React, { useEffect, useState } from "react"
import ChatModel from "../../models/Chat"
import { getAllChats, sendMessage } from "../../api/services/chat"
import ChatList from "./ChatList/index"

const ChatPage = () => {
  const [data, setData] = useState<{ chats: ChatModel[] }>({ chats: [] })
  const [messageText, setMessageText] = useState("")

  useEffect(() => {
    getAllChats().then((data) => setData(data))
  }, [])

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      if (data.chats.length !== 0) {
        sendMessage(data.chats[0].id, messageText, ).then((_) => setMessageText(""))
      }
    }
  }

  return (
    <div className={styles.chatPage}>
      <ChatList chats={data.chats} />
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
      <button className={styles.chatPage__createButton}>Создать чат</button>
    </div>
  )
}

export default ChatPage
