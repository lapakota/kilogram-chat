import User from "./User"
import Message from "./Message"
import Meta from "./Meta"

export default interface Chat {
  id: string
  type: string
  image?: string
  members: User[]
  messages: Message[]
  meta: Meta[]
  name: string
  owner: User
}
