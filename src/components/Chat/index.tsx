import styles from "./index.module.scss"
import React, { useEffect, useState } from "react"
import Chat from "../../models/Chat"
import Message from "../../models/Message"
import { ChatMessage } from "./ChatMessage"
import { getAllChats } from "../../api/services/chat"

const ChatPage = () => {
  const [data, setData] = useState({ chats: [] })

  useEffect(() => {
    getAllChats().then((data) => setData(data))
  }, [])

  return (
    <div className={styles.chatPage}>
      {data.chats.map((chat: Chat) => (
        <div className={styles.chatPage__chat}>
          <header className={styles.chatPage__header}>
            <img alt="chat logo" src={`data:image/png;base64,${chat.image}`} />
            {chat.name}
          </header>
          <main className={styles.chatPage__main}>
            <div className={styles.chatPage__chats}>
              {chat.messages.map((message: Message) => (
                <ChatMessage
                  login={message.createdBy.login}
                  text={message.text}
                  avatar={message.createdBy.image}
                />
              ))}
            </div>
          </main>
          <button className={styles.chatPage__createButton}>Создать чат</button>
          <form className={styles.chatPage__form}>
            <input
              className={styles.chatPage__input}
              type="text"
              placeholder="Введите сообщение..."
            />
          </form>
        </div>
      ))}
    </div>
  )
}

export default ChatPage
