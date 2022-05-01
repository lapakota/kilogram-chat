import styles from "./index.module.scss"
import React, { Dispatch } from "react"
import Message from "../../../models/Message"
import cn from "classnames"
import { formatDate } from "../../../utils/dateFormater"
import { useAppSelector } from "../../../hooks"
import editImage from "../../../assets/edit.png"

type ChatMessageProps = {
  message: Message
  setIsChangeMessageModalOpened: Dispatch<boolean>
  setChangeMessage: Dispatch<Message>
}

const BLANK_USER_AVATAR =
  "https://w7.pngwing.com/pngs/547/748/png-transparent-anonymous-avatar-youtube-anonymity-anonymous-emblem-photography-logo.png"

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  setIsChangeMessageModalOpened,
  setChangeMessage,
}) => {
  const loginUser = useAppSelector((state) => state.user.login)
  const editable = message.createdBy.login === loginUser

  const onEditMessage = () => {
    if (editable) {
      setChangeMessage(message)
      setIsChangeMessageModalOpened(true)
    }
  }

  return (
    <div
      className={cn(
        styles.message,
        loginUser === message.createdBy.login ? styles.owner : ""
      )}
    >
      <img
        className={styles.message__avatar}
        alt="user avatar"
        src={
          message.createdBy.image
            ? `data:image/png;base64,${message.createdBy.image}`
            : BLANK_USER_AVATAR
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <span
            className={styles.message__text}
            style={{ width: editable ? "calc(100% - 24px)" : "100%" }}
          >
            {message.text}
          </span>
          {editable && (
            <button className={styles.message__editButton} onClick={onEditMessage}>
              <img
                width={16}
                height={16}
                src={editImage}
                alt={"edit"}
                style={{ position: "absolute", bottom: 0, right: 0 }}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
