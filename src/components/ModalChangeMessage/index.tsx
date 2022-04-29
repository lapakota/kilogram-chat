import React, { Dispatch, useState } from "react"
import { useAppSelector } from "../../hooks"
import { editMessage } from "../../api/services/message"
import { CustomModal } from "../../common/CustomModal"
import Message from "../../models/Message"

interface ModalChangeMessageProps {
  isOpen: boolean
  setIsOpen: Dispatch<boolean>
  message: Message
}

export const ModalChangeMessage: React.FC<ModalChangeMessageProps> = ({
  isOpen,
  setIsOpen,
  message,
}) => {
  const chatId = useAppSelector((state) => state.user.activeChat)
  const token = useAppSelector((state) => state.user.token)

  const [textMessage, setTextMessage] = useState(message.text)

  const closeModal = () => {
    editMessage(chatId, message.id, textMessage, token).then((x) => {
      if (x.editMessage !== null) {
        setIsOpen(false)
        console.log(x)
      } else {
      }
    })
  }
  return (
    <CustomModal isOpen={isOpen}>
      <input value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
      <button onClick={closeModal}>Закрыть</button>
    </CustomModal>
  )
}
