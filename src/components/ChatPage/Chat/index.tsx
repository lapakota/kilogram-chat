import React from "react"
import ChatModel from "../../../models/Chat"
import Message from "../../../models/Message"
import { ChatMessage } from "../ChatMessage"

type ChatProps = {
  className?: string
  data: ChatModel
}

const Chat = ({ className, data }: ChatProps) => {
  return (
    <div className={className}>
      {data.messages.map((message: Message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  )
}

export default Chat
