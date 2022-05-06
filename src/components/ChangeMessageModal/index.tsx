import React, { useEffect, useState } from "react"
import { useAppSelector } from "../../hooks"
import { deleteMessage, editMessage } from "../../api/services/message"
import { CustomModal } from "../../common/CustomModal"
import Message from "../../models/Message"
import styles from "./index.module.scss"
import { ButtonColors, CustomButton } from "../../common/CustomButton"

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

  const deleteMessageAndCloseModal = () => {
    deleteMessage(chatId, message.id, token).then((_) => {
      setIsOpen(false)
    })
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === "Enter" && saveAndCloseModal()
  }

  useEffect(() => {
    setMessageText(message.text)
  }, [message.text])

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
          <CustomButton
            text={"Сбросить"}
            onClick={resetEditedText}
            color={ButtonColors.Green}
            style={{ width: "100%" }}
          />
          <CustomButton
            text={"Сохранить"}
            onClick={saveAndCloseModal}
            color={ButtonColors.Orange}
            style={{ width: "100%" }}
          />
        </div>
        <CustomButton
          text={"Удалить"}
          onClick={deleteMessageAndCloseModal}
          color={ButtonColors.Red}
          style={{ width: "100%", marginTop: "15px" }}
        />
      </div>
    </CustomModal>
  )
}
