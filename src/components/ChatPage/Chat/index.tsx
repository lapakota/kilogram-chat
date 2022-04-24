import React from "react"
import Message from "../../../models/Message"
import { ChatMessage } from "../ChatMessage"
import {useAppSelector} from "../../../hooks";

type ChatProps = {
  className?: string
  chatId: number | string
}

const Chat = ({ className, chatId }: ChatProps) => {
  const chat = useAppSelector((state) => state.chats.chats.find(x => x.id === chatId));
  if (!chat){
    return null;
  }
  return (
    <div className={className}>
      {chat.messages.map((message: Message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  )
}

export default Chat
