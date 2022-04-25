import styles from "./index.module.scss"
import React from "react"
import Message from "../../../models/Message"
import cn from "classnames"
import { useAppSelector } from "../../../hooks"
import {formatDate} from "../../../utils/dateFormater";

type ChatMessageProps = {
  message: Message
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const userLogin = useAppSelector((state) => state.user.login)

  return (
    <div
      className={cn(
        styles.message,
        userLogin === message.createdBy.login ? styles.owner : ""
      )}
    >
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
