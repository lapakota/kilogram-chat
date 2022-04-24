import ChatModel from "../../../models/Chat"
import ChatLabel from "./ChatLabel"
import styles from "../index.module.scss";

type ChatListProps = {
  className?: string
  chats: ChatModel[]
}

const ChatList = ({ className, chats }: ChatListProps) => {
  return (
    <div className={className}>
      {chats.map((chat) => (
        <ChatLabel key={chat.id} className={styles.chatPage__chatLabel} chat={chat} />
      ))}
    </div>
  )
}
export default ChatList
