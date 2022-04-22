import Meta from "./Meta"
import User from "./User";

export default interface Message {
  id: string
  createdAt: string
  createdBy: User;
  meta: Meta[]
  text: string
}
