import styles from "./index.module.scss"
import React, { useState } from "react"
import Message from "../../../models/Message"
import cn from "classnames"
import { formatDate } from "../../../utils/dateFormater"
import { useAppSelector } from "../../../hooks"
import { ModalChangeMessage } from "../../ModalChangeMessage"

type ChatMessageProps = {
  message: Message
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const loginUser = useAppSelector((state) => state.user.login)
  const [isOpenModalChangeMessage, setIsOpenModalChangeMessage] = useState(false)

  const onClick = () => {
    if (message.createdBy.login === loginUser) {
      setIsOpenModalChangeMessage(true)
    }
  }
  return (
    <div
      onClick={onClick}
      className={cn(
        styles.message,
        loginUser === message.createdBy.login ? styles.owner : ""
      )}
    >
      <ModalChangeMessage
        isOpen={isOpenModalChangeMessage}
        setIsOpen={setIsOpenModalChangeMessage}
        message={message}
      />
      <img
        className={styles.message__avatar}
        alt="user avatar"
        src={
          message.createdBy.image
            ? `data:image/png;base64,${message.createdBy.image}`
            : "https://w7.pngwing.com/pngs/547/748/png-transparent-anonymous-avatar-youtube-anonymity-anonymous-emblem-photography-logo.png"
        }
      />
      <div className={styles.message__content}>
        <div className={styles.message__title}>
          <span className={styles.message__title_userName}>
            {message.createdBy.login}
          </span>
          <span className={styles.message__title_time}>
            {formatDate(message.createdAt)}
          </span>
        </div>
        <span className={styles.message__text}>{message.text}</span>
      </div>
    </div>
  )
}
