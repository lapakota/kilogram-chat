import { Meta } from "./Meta"

export interface User {
  image?: string
  login: string
  meta: Meta[]
  name: string
}
