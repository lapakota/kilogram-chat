import React, { useState } from "react"
import Message from "../../../models/Message"
import { ChatMessage } from "../ChatMessage"
import { useAppSelector } from "../../../hooks"
import { ModalChangeMessage } from "../../ModalChangeMessage"

type ChatProps = {
  className?: string
  chatId: number | string
}

const Chat = ({ className, chatId }: ChatProps) => {
  const chat = useAppSelector((state) =>
    state.chats.chats.find((x) => x.id === chatId)
  )
  const [isOpenModalChangeMessage, setIsOpenModalChangeMessage] = useState(false)
  if (!chat) {
    return null
  }

  return (
    <div className={className}>
      <ModalChangeMessage
        isOpen={isOpenModalChangeMessage}
        setIsOpen={setIsOpenModalChangeMessage}
      />
      {chat.messages.map((message: Message) => (
        <ChatMessage
          key={message.id}
          message={message}
          setIsOpenModalChangeMessage={setIsOpenModalChangeMessage}
        />
      ))}
    </div>
  )
}

export default Chat
