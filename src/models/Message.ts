import Meta from "./Meta"
import BaseUser from "./BaseUser"

export default interface Message {
  id: string
  createdAt: string
  createdBy: BaseUser
  meta: Meta[]
  text: string
}
