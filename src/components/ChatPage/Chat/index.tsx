import React, { Dispatch } from "react"
import Message from "../../../models/Message"
import { ChatMessage } from "../ChatMessage"
import { useAppSelector } from "../../../hooks"
import "./index.scss"

type ChatProps = {
  className?: string
  chatId: number | string
  setIsChangeMessageModalOpened: Dispatch<boolean>
  setChangeMessage: Dispatch<Message>
}

const Chat = ({
  className,
  chatId,
  setIsChangeMessageModalOpened,
  setChangeMessage,
}: ChatProps) => {
  const chat = useAppSelector((state) =>
    state.chats.chats.find((x) => x.id === chatId)
  )

  const chatStyles = chat
    ? {}
    : { display: "flex", alignItems: "center", justifyContent: "center" }

  return (
    <div style={chatStyles} className={className}>
      {chat ? (
        chat.messages.map((message: Message) => (
          <ChatMessage
            key={message.id + message.createdAt}
            message={message}
            setIsChangeMessageModalOpened={setIsChangeMessageModalOpened}
            setChangeMessage={setChangeMessage}
          />
        ))
      ) : (
        <div className={"chat__blank"}>Выберите чат</div>
      )}
    </div>
  )
}

export default Chat
