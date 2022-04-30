import styles from "./index.module.scss"
import React, { useEffect, useState } from "react"
import { getAllChats } from "../../api/services/chat"
import ChatList from "./ChatList/index"
import Chat from "./Chat"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { setChats } from "../../store/slices/chatsSlice"
import ChatInput from "./ChatInput"
import { CreateChatModal } from "../CreateChatModal"
import Header from "./Header"
import { ButtonColors, CustomButton } from "../../common/CustomButton"

const ChatPage = () => {
  const dispatch = useAppDispatch()
  const chats = useAppSelector((state) => state.chats.chats)
  const activeChatId = useAppSelector((state) => state.user.activeChat)
  const activeChat = chats.find((chat) => chat.id === activeChatId)
  const token = useAppSelector((state) => state.user.token)
  const [creatingChat, setCreatingChat] = useState(false)

  useEffect(() => {
    const unsubscribe = setInterval(
      () => getAllChats(token).then((data) => dispatch(setChats(data.chats))),
      500
    )

    return () => clearInterval(unsubscribe)
  }, [dispatch, token])

  const onSendMessage = () => {
    getAllChats(token).then((data) => dispatch(setChats(data.chats)))
  }

  return (
    <div className={styles.chatPage}>
      {creatingChat && (
        <CreateChatModal
          creatingChat={creatingChat}
          setIsCreatingChat={setCreatingChat}
        />
      )}
      {activeChat && (
        <Header chat={activeChat} className={styles.chatPage__header} />
      )}
      <ChatList className={styles.chatPage__chatList} chats={chats} />
      <main className={styles.chatPage__main}>
        <Chat className={styles.chatPage__chat} chatId={activeChatId} />
      </main>
      <ChatInput onSendMessage={onSendMessage} chat={activeChat} />
      <CustomButton
        className={styles.chatPage__createButton}
        text={"Создать чат"}
        color={ButtonColors.Orange}
        onClick={() => setCreatingChat(true)}
      />
    </div>
  )
}

export default ChatPage
