import ChatModel from "../../../models/Chat"

type ChatListProps = {
  className?: string
  chats: ChatModel[]
}

const ChatList = ({ className, chats }: ChatListProps) => {
  return (
    <div className={`styles.chatPage__chatList ${className}`}>
      {chats.map((chat) => (
        <div key={chat.id}>{chat.name}</div>
      ))}
    </div>
  )
}
export default ChatList;
