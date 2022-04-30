import React from "react"
import styles from "./index.module.scss"
import { useAppSelector } from "../../../hooks"

export const ChatInfo: React.FC = () => {
  // TODO разобраться почему members пустые
  const members = useAppSelector((state) => state.chat.members)

  return (
    <div className={styles.chatInfo}>
      {members.map((x) => (
        <div>{x.login}</div>
      ))}
    </div>
  )
}
