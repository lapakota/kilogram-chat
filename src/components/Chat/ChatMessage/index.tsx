import styles from "./index.module.scss"
import React from "react"

type ChatMessageProps = {
  text: string
  login: string
  avatar?: string
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  text,
  login,
  avatar = null,
}) => {
  return (
    <div className={styles.message}>
      {avatar && (
        <img
          className={styles.message__avatar}
          alt="user avatar"
          src={`data:image/png;base64,${avatar}`}
        />
      )}
      <div className={styles.message__content}>
        <div className={styles.message__title}>
          <span className={styles.message__title_userName}>{login}</span>
          <span className={styles.message__title_time}>{"13/06/2001"}</span>
        </div>
        <span className={styles.message__text}>{text}</span>
      </div>
    </div>
  )
}
