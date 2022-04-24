import styles from "./index.module.scss"
import React, { useEffect, useState } from "react"
import Chat from "../../models/Chat"
import Message from "../../models/Message"
import { ChatMessage } from "./ChatMessage"
import { getAllChats, sendMessage } from "../../api/services/chat"

const ChatPage = () => {
  const [data, setData] = useState<{ chats: Chat[] }>({ chats: [] })

  const [messageText, setMessageText] = useState("")

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("enter press here! ")
      if (data.chats.length !== 0) {
        sendMessage(data.chats[0].id, messageText).then((_) => setMessageText(""))
      }
    }
  }

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
              onChange={(e) => setMessageText(e.target.value)}
              value={messageText}
              onKeyDown={(e) => onKeyDown(e)}
            />
          </form>
        </div>
      ))}
    </div>
  )
}

export default ChatPage
