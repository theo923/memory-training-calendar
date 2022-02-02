import React, { useContext, useEffect } from 'react'
import { UserTasksProps } from 'lib/interface'
import Box from 'styled/Box'
import Button from 'styled/Button'
import { ModalContext } from 'components/Modal/ModalContext'
import CreateTaskBoardExtend from './extend'
import CreateTaskBoardDefaultLayout from './defaultLayout'

interface Props {
  userTasks: UserTasksProps,
  setUserTasks: React.Dispatch<React.SetStateAction<UserTasksProps>>,
  target: Date,
  setTarget: React.Dispatch<React.SetStateAction<Date>>,
}

const CreateTaskBoard: React.FC<Props> = ({
  userTasks,
  setUserTasks,
  target,
  setTarget,
}): JSX.Element => {
  const modalContext = useContext(ModalContext)

  useEffect(() => {
    if (modalContext.modalIsOpen) {
      modalContext.setModalContent(
        <Box width='50vw'>
          <CreateTaskBoardExtend
            userTasks={userTasks}
            setUserTasks={setUserTasks}
            target={target}
            setTarget={setTarget}
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
        userTasks={userTasks}
        setUserTasks={setUserTasks}
        target={target}
        setTarget={setTarget}
      />
    </Box>
  )
}

export default CreateTaskBoard
