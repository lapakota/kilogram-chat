import ChatModel from "../../../models/Chat"
import ChatLabel from "./ChatLabel"
import styles from "../index.module.scss"

type ChatListProps = {
  className?: string
  chats: ChatModel[]
}

const ChatList = ({ className, chats }: ChatListProps) => {
  const emptyChats = [...chats].filter((x) => x.messages.length === 0)

  const sortedNotEmptyChats = [...chats]
    .filter((x) => x.messages.length !== 0)
    .sort((a, b) => {
      const lastMessage1 = a.messages[0]
      const lastMessage2 = b.messages[0]

      return lastMessage1.createdAt < lastMessage2.createdAt ? 1 : -1
    })

  const renderedChats = [...sortedNotEmptyChats, ...emptyChats]

  return (
    <div className={className}>
      {renderedChats.map((chat) => (
        <ChatLabel
          key={chat.id}
          className={styles.chatPage__chatLabel}
          chat={chat}
        />
      ))}
    </div>
  )
}
export default ChatList
