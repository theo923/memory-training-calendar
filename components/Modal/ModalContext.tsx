import { createContext, Dispatch, ReactNode, SetStateAction } from "react";

interface ValuesProps {
  modalIsOpen: boolean
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
  modalContent: ReactNode | null
  setModalContent: Dispatch<SetStateAction<ReactNode>>
}

export const ModalContext = createContext<ValuesProps>({
  modalIsOpen: false,
  setModalIsOpen: () => { },
  modalContent: null,
  setModalContent: () => { }
})
