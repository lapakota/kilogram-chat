import styles from "./index.module.scss"
import React, { useEffect, useState } from "react"
import { getAllChats } from "../../api/services/chat"
import ChatList from "./ChatList/index"
import Chat from "./Chat"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { setChats } from "../../store/slices/chatsSlice"
import ChatInput from "./ChatInput/ChatInput"
import { CreateChat } from "../CreateChat"
import Header from "./Header/Header"

const ChatPage = () => {
  const dispatch = useAppDispatch()
  const chats = useAppSelector((state) => state.chats.chats)
  const activeChatId = useAppSelector((state) => state.user.activeChat)
  const activeChat = chats.find((chat) => chat.id === activeChatId)
  const token = useAppSelector((state) => state.user.token)
  const [creatingChat, setCreatingChat] = useState(false)

  useEffect(() => {
    getAllChats(token).then((data) => dispatch(setChats(data.chats)))
  }, [dispatch, token])

  const onSendMessage = () => {
    getAllChats(token).then((data) => dispatch(setChats(data.chats)))
  }

  return (
    <div className={styles.chatPage}>
      {activeChat && (
        <Header chat={activeChat} className={styles.chatPage__header} />
      )}
      <ChatList className={styles.chatPage__chatList} chats={chats} />
      <main className={styles.chatPage__main}>
        {creatingChat ? (
          <CreateChat setIsCreateChat={setCreatingChat} />
        ) : (
          <Chat className={styles.chatPage__chat} chatId={activeChatId} />
        )}
      </main>
      <ChatInput onSendMessage={onSendMessage} chat={activeChat} />
      <button
        onClick={() => setCreatingChat(true)}
        className={styles.chatPage__createButton}
      >
        Создать чат
      </button>
    </div>
  )
}

export default ChatPage
