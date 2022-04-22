import { Meta } from "./Meta"

export interface Message {
  id: string
  createdAt: string
  meta: Meta[]
  text: string
}
