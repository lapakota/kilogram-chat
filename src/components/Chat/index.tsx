import styles from "./index.module.scss"
import React, { useEffect, useState } from "react"
import Chat from "../../models/Chat"
import Message from "../../models/Message"

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
            <ul className={styles.chatPage__chatsList}>
              {chat.messages.map((message: Message) => (
                <li className={styles.chat__message}>
                  {message.createdBy.image ? (
                    <img
                      alt="user avatar"
                      src={`data:image/png;base64,${message.createdBy.image}`}
                    />
                  ) : null}
                  {message.createdBy.login}: {message.text}
                </li>
              ))}
            </ul>
          </main>
          <button className={styles.chatPage__createButton}>Создать чат</button>
          <form className={styles.chatPage__form}>
            <input
              className={styles.chatPage__input}
              type="text"
              placeholder="Введите сообщение"
            />
            <button className={styles.chatPage__inputButton}>Отправить</button>
          </form>
        </div>
      ))}
    </div>
  )
}

export default ChatPage
