import BaseUser from "./BaseUser"
import Message from "./Message"
import Meta from "./Meta"

export default interface Chat {
  id: string
  type: string
  image?: string
  members: BaseUser[]
  messages: Message[]
  meta: Meta[]
  name: string
  owner: BaseUser
}
