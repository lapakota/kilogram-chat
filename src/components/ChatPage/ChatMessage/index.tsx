import styles from "./index.module.scss"
import React, { Dispatch, useState } from "react"
import Message from "../../../models/Message"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { setMessage } from "../../../store/slices/messageSlice"

type ChatMessageProps = {
  message: Message
  setIsOpenModalChangeMessage: Dispatch<boolean>
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  setIsOpenModalChangeMessage,
}) => {
  const dispatch = useAppDispatch()
  const loginUser = useAppSelector((state) => state.user.login)

  const onClick = () => {
    if (message.createdBy.login === loginUser) {
      dispatch(setMessage(message))
      setIsOpenModalChangeMessage(false)
    }
  }

  return (
    <div className={styles.message} onClick={onClick}>
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
            {new Date(message.createdAt).toLocaleDateString()}
          </span>
        </div>
        <span className={styles.message__text}>{message.text}</span>
      </div>
    </div>
  )
}
