import React from "react"
import styles from "./index.module.scss"
import Chat from "../../../models/Chat"
import { MemberInfo } from "./MemberInfo"

type ChatInfoProps = {
  activeChat: Chat | undefined
}

export const ChatInfo: React.FC<ChatInfoProps> = ({ activeChat }) => {
  const chatTypeToRussian = (type: string) => {
    switch (type) {
      case "GROUP":
        return "Группа"
      case "PRIVATE":
        return "Приватный чат"
      case "CHANNEL":
        return "Канал"
    }
  }

  if (!activeChat) return null

  return (
    <section className={styles.chatInfo}>
      <h2 className={styles.chatInfo__chatType}>
        {chatTypeToRussian(activeChat.type)}
      </h2>
      {activeChat.members
        .filter((a, _) => (a.login === activeChat.owner.login ? 1 : -1))
        .map((member) => (
          <MemberInfo key={member.login} member={member} />
        ))}
    </section>
  )
}
