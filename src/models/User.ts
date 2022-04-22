import Meta from "./Meta"

export default interface User {
  image?: string
  login: string
  meta: Meta[]
  name: string
}
