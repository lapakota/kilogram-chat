import Modal from "react-modal"
import React from "react"

interface PropsModal {
  readonly isOpen: boolean
  readonly classname?: string
}

export const CustomModal: React.FC<PropsModal> = ({
  isOpen,
  classname,
  children,
}) => {
  return (
    <Modal style={customStyles} className={classname} isOpen={isOpen}>
      {children}
    </Modal>
  )
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}
