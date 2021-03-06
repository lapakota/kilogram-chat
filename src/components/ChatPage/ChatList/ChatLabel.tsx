import Chat from "../../../models/Chat"
import styles from "../index.module.scss"
import defaultAvatar from "../../../assets/defaultAvatar.png"
import { changeChat } from "../../../store/slices/userSlice"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { formatDate } from "../../../utils/dateFormater"
import cn from "classnames"

type ChatLabelProps = {
  className: string
  chat: Chat
}

const imgStyle = {
  width: "50px",
  height: "50px",
}

const ChatLabel = ({ className, chat }: ChatLabelProps) => {
  const activeChatID = useAppSelector((state) => state.user.activeChat)

  const lastMessage = chat.messages[0]
  const dispatch = useAppDispatch()

  return (
    <div
      onClick={() => dispatch(changeChat(chat.id))}
      className={cn(className, { [styles.activeChat]: activeChatID === chat.id })}
    >
      <img
        className={styles.chatPage__chatLabel__image}
        style={imgStyle}
        src={chat.image ? `data:image/png;base64,${chat.image}` : defaultAvatar}
        alt={"Chat avatar"}
      />
      <span className={styles.chatPage__chatLabel__name}>{chat.name}</span>
      {lastMessage && (
        <>
          <span className={styles.chatPage__chatLabel__text}>
            {lastMessage.text}
          </span>

          <span className={styles.chatPage__chatLabel__date}>
            {formatDate(lastMessage.createdAt)}
          </span>
        </>
      )}
    </div>
  )
}

export default ChatLabel
