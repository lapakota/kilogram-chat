import styles from "./index.module.scss"
import React, { useEffect, useState } from "react"
import Chat from "../../models/Chat"
import Message from "../../models/Message"
import { ChatMessage } from "./ChatMessage"

const ChatPage = () => {
  const [data, setData] = useState({ chats: [] })

  useEffect(() => {
    const controller = new AbortController()

    fetch("https://kilogram-api.yandex-urfu-2021.ru/query", {
      signal: controller.signal,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          chats {
            image
            name
            messages {
              createdBy { 
                image
                login 
                name
              }
        
              text
            }
          }
        }`,
      }),
    })
      .then((response) => response.json())
      .then((json) => setData(json.data))

    return () => controller.abort()
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
