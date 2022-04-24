import React, { useState } from "react"
import ChatModel from "../../../models/Chat"
import { sendMessage } from "../../../api/services/chat"
import styles from "../index.module.scss"
import Chat from "../Chat"

type ChatsProps = {
  className?: string
  chats: ChatModel[]
}

const Chats = ({ className, chats }: ChatsProps) => {

  return (
    <div>
      {chats.map((chat: ChatModel) => (
        <div key={chat.id} className={styles.chatPage__chat}>
          <header className={styles.chatPage__header}>
            <img alt="chat logo" src={`data:image/png;base64,${chat.image}`} />
            {chat.name}
          </header>
          <main className={styles.chatPage__main}>
            <Chat className={styles.chatPage__chats} data={chat} />
          </main>
        </div>
      ))}
    </div>
  )
}

export default Chats
