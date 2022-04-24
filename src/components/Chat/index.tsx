import styles from "./index.module.scss"
import React, { useEffect, useState } from "react"
import Chat from "../../models/Chat"
import Message from "../../models/Message"
import { getAllChats, sendMessage } from "../../api/services/chat"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { setChats } from "../../store/slices/chatsSlice"
import { CreateChat } from "../CreateChat"
import { ChatMessage } from "../ChatPage/ChatMessage"

const ChatPage = () => {
  const dispatch = useAppDispatch()

  const [messageText, setMessageText] = useState("")
  const chats = useAppSelector((state) => state.chats.chats)
  const [isCreateChat, setIsCreateChat] = useState(false)

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (chats.length !== 0) {
        sendMessage(chats[0].id, messageText).then((_) => setMessageText(""))
      }
    }
  }

  useEffect(() => {
    getAllChats().then((data) => dispatch(setChats(data.chats)))
  }, [])

  return (
    <div className={styles.chatPage}>
      {isCreateChat ? (
        <CreateChat setIsCreateChat={setIsCreateChat} />
      ) : (
        <>
          {chats.map((chat: Chat) => (
            <div className={styles.chatPage__chat}>
              <header className={styles.chatPage__header}>
                <img alt="chat logo" src={`data:image/png;base64,${chat.image}`} />
                {chat.name}
              </header>
              <main className={styles.chatPage__main}>
                <div className={styles.chatPage__chats}>
                  {chat.messages.map((message: Message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                </div>
              </main>
              <button
                className={styles.chatPage__createButton}
                type="button"
                onClick={() => setIsCreateChat(true)}
              >
                Создать чат
              </button>
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
          ))}{" "}
        </>
      )}
    </div>
  )
}

export default ChatPage
