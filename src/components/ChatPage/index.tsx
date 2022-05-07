import styles from "./index.module.scss"
import React, { useEffect, useState } from "react"
import { getAllChats } from "../../api/services/chat"
import ChatList from "./ChatList/index"
import ChatArea from "./Chat"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { setChats } from "../../store/slices/chatsSlice"
import ChatInput from "./ChatInput"
import { CreateChatModal } from "../CreateChatModal"
import Header from "./Header"
import { ButtonColors, CustomButton } from "../../common/CustomButton"
import { ChatInfo } from "./ChatInfo"
import { ChangeMessageModal } from "../ChangeMessageModal"
import Message from "../../models/Message"

const ChatPage = () => {
  const dispatch = useAppDispatch()
  const chats = useAppSelector((state) => state.chats.chats)
  const activeChatId = useAppSelector((state) => state.user.activeChat)
  const activeChat = chats.find((chat) => chat.id === activeChatId)
  const token = useAppSelector((state) => state.user.token)

  const [changeMessage, setChangeMessage] = useState<Message>()
  const [creatingChat, setCreatingChat] = useState(false)
  const [isChangeMessageModalOpened, setIsChangeMessageModalOpened] = useState(false)

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
      <CreateChatModal
        creatingChat={creatingChat}
        setIsCreatingChat={setCreatingChat}
      />
      {changeMessage !== undefined && (
        <ChangeMessageModal
          message={changeMessage}
          isOpen={isChangeMessageModalOpened}
          setIsOpen={setIsChangeMessageModalOpened}
        />
      )}
      {activeChat && (
        <Header chat={activeChat} className={styles.chatPage__header} />
      )}
      <ChatList className={styles.chatPage__chatList} chats={chats} />
      <main className={styles.chatPage__main}>
        <ChatArea
          className={styles.chatPage__chat}
          activeChat={activeChat}
          setIsChangeMessageModalOpened={setIsChangeMessageModalOpened}
          setChangeMessage={setChangeMessage}
        />
      </main>
      <ChatInput onSendMessage={onSendMessage} chat={activeChat} />
      <ChatInfo activeChat={activeChat} />
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
