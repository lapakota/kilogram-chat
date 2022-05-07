import React, { Dispatch } from "react"
import Message from "../../../models/Message"
import { ChatMessage } from "../ChatMessage"
import "./index.scss"
import Chat from "../../../models/Chat"

type ChatProps = {
  className?: string
  activeChat: Chat | undefined
  setIsChangeMessageModalOpened: Dispatch<boolean>
  setChangeMessage: Dispatch<Message>
}

const ChatArea = ({
  className,
  activeChat,
  setIsChangeMessageModalOpened,
  setChangeMessage,
}: ChatProps) => {
  const chatStyles = activeChat
    ? {}
    : { display: "flex", alignItems: "center", justifyContent: "center" }

  return (
    <div style={chatStyles} className={className}>
      {activeChat ? (
        activeChat.messages.map((message: Message) => (
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

export default ChatArea
