import styles from "./index.module.scss"
import React from "react"
import BaseUser from "../../../../models/BaseUser"
import { BLANK_USER_AVATAR } from "../../ChatMessage"

type UserInfoProps = {
  member: BaseUser
}

export const MemberInfo: React.FC<UserInfoProps> = ({ member }) => {
  return (
    <section className={styles.memberInfo}>
      <img
        src={
          member.image ? `data:image/png;base64,${member.image}` : BLANK_USER_AVATAR
        }
        className={styles.memberInfo__avatar}
        alt={"member avatar"}
      />
      <h3 className={styles.memberInfo__login}>{member.login}</h3>
    </section>
  )
}
