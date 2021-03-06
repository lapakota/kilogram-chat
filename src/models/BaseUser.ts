import Meta from "./Meta"

export default interface BaseUser {
  image?: string
  login: string
  meta: Meta[]
  name: string
  token: string
}
