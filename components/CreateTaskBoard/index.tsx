import React, { useContext, useEffect} from 'react'
import { TaskColorProps, UserProps, UserTasksProps } from 'lib/interface'
import Box from 'styled/Box'
import Button from 'styled/Button'
import { ModalContext } from 'components/Modal/ModalContext'
import CreateTaskBoardExtend from './extend'
import CreateTaskBoardDefaultLayout from './defaultLayout'

interface Props {
  userTasks: UserTasksProps,
  setUserTasks: React.Dispatch<React.SetStateAction<UserTasksProps>>,
  target: Date,
  currentUser: UserProps,
  colorPalette: TaskColorProps,
}

const CreateTaskBoard: React.FC<Props> = ({
  userTasks,
  setUserTasks,
  target,
  currentUser,
  colorPalette,
}): JSX.Element => {
  const modalContext = useContext(ModalContext)

  useEffect(() => {
    if (modalContext.modalIsOpen) {
      modalContext.setModalContent(
        <Box width='50vw'>
          <CreateTaskBoardExtend
            currentUser={currentUser}
            userTasks={userTasks}
            setUserTasks={setUserTasks}
            target={target}
            colorPalette={colorPalette}
          />
        </Box>
      )
    }
    else {
      modalContext.setModalContent(null)
    }
  }, [modalContext.modalIsOpen])

  return (
    <Box data-test="component-createTaskBoard">
      <Button onClick={() => modalContext.setModalIsOpen(true)}>Extend</Button>
      <CreateTaskBoardDefaultLayout
        currentUser={currentUser}
        userTasks={userTasks}
        setUserTasks={setUserTasks}
        target={target}
        colorPalette={colorPalette}
      />
    </Box>
  )
}

export default CreateTaskBoard
