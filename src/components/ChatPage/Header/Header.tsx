import Chat from "../../../models/Chat"
import styles from "../index.module.scss"
import defaultAvatar from "../../../assets/defaultAvatar.png"

type HeaderProps = {
  className?: string
  chat: Chat
}
const imgStyle = {
  width: "50px",
  height: "50px",
}

const Header = ({ chat, className }: HeaderProps) => {
  return (
    <header className={className}>
      <img
        className={styles.chatPage__chatLabel__image}
        style={imgStyle}
        src={chat.image ? `data:image/png;base64,${chat.image}` : defaultAvatar}
        alt={"Chat Image"}
      />
      <span className={styles.chatPage__chatLabel__name}>{chat.name}</span>
    </header>
  )
}

export default Header
