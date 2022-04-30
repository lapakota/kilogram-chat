import React from "react"
import styles from "./index.module.scss"
import cn from "classnames"

export enum ButtonColors {
  Green,
  Orange,
}

type CustomButtonProps = {
  text: string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  color?: ButtonColors
  style?: { [attr: string]: string }
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  className = "",
  onClick,
  color = ButtonColors.Green,
  style = {},
}) => {
  const getColorClassName = (color: ButtonColors) => {
    switch (color) {
      case ButtonColors.Green:
        return styles.green
      case ButtonColors.Orange:
        return styles.orange
      default:
        return ""
    }
  }

  return (
    <button
      className={cn(className, styles.button, getColorClassName(color))}
      style={style}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  )
}
