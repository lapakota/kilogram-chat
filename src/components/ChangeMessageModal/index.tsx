import React, { useState } from "react"
import { useAppSelector } from "../../hooks"
import { editMessage } from "../../api/services/message"
import { CustomModal } from "../../common/CustomModal"
import Message from "../../models/Message"
import styles from "./index.module.scss"
import cn from "classnames"

interface ChangeMessageModalProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  message: Message
}

export const ChangeMessageModal: React.FC<ChangeMessageModalProps> = ({
  isOpen,
  setIsOpen,
  message,
}) => {
  const [messageText, setMessageText] = useState(message.text)

  const chatId = useAppSelector((state) => state.user.activeChat)
  const token = useAppSelector((state) => state.user.token)

  const saveAndCloseModal = () => {
    if (messageText.trim().length === 0) return

    editMessage(chatId, message.id, messageText, token).then((x) => {
      if (x.editMessage !== null) {
        setIsOpen(false)
      }
    })
  }

  const resetEditedText = () => {
    setMessageText(message.text)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === "Enter" && saveAndCloseModal()
  }

  return (
    <CustomModal isOpen={isOpen}>
      <div className={styles.changeMessage}>
        <input
          className={styles.changeMessage__input}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <div className={styles.changeMessage__buttons}>
          <button
            className={cn(
              styles.changeMessage__button,
              styles.changeMessage__resetButton
            )}
            onClick={resetEditedText}
          >
            Сбросить
          </button>
          <button
            className={cn(
              styles.changeMessage__button,
              styles.changeMessage__saveButton
            )}
            onClick={saveAndCloseModal}
          >
            Сохранить
          </button>
        </div>
      </div>
    </CustomModal>
  )
}
