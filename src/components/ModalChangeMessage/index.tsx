import React, { Dispatch, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { editMessage } from "../../api/services/message"
import { CustomModal } from "../../common/CustomModal"

interface ModalChangeMessageProps {
  isOpen: boolean
  setIsOpen: Dispatch<boolean>
}

export const ModalChangeMessage: React.FC<ModalChangeMessageProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const message = useAppSelector((state) => state.message)
  const chatId = useAppSelector((state) => state.chat.id)
  const token = useAppSelector((state) => state.user.token)
  const [textMessage, setTextMessage] = useState(message.text)
  const dispatch = useAppDispatch()

  const closeModal = () => {
    editMessage(chatId, message.id, textMessage, token).then((x) => {
      setIsOpen(false)
    })
  }
  return (
    <CustomModal isOpen={isOpen}>
      <input value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
      <button onClick={closeModal}>Закрыть</button>
    </CustomModal>
  )
}
