import React, { useContext, useEffect } from 'react'
import { UserTasksProps } from 'lib/interface'
import { initializeUserTask } from 'lib/initialize'
import { getFullDate } from 'lib/get/getDate'
import Box from 'styled/Box'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import { RiCloseCircleFill } from 'react-icons/ri'
import { ModalContext } from 'components/Modal/ModalContext'
import CreateTaskBoardDefaultLayout from './defaultLayout'

interface Props {
  userTasks: UserTasksProps,
  setUserTasks: React.Dispatch<React.SetStateAction<UserTasksProps>>,
  target: Date,
  setTarget: React.Dispatch<React.SetStateAction<Date>>
}

const CreateTaskBoardExtend: React.FC<Props> = ({
  userTasks,
  setUserTasks,
  target,
  setTarget,
}): JSX.Element => {
  const modalContext = useContext(ModalContext)

  useEffect(() => {
    if (!userTasks![getFullDate(target)])
      initializeUserTask(setUserTasks, target)
  }, [target])

  return (
    <Box data-test="createTaskBoard-extend">
      <Flex justifyContent='flex-end'>
        <Button onClick={() => modalContext.setModalIsOpen(false)}><RiCloseCircleFill size='20px' /></Button>
      </Flex>
      <CreateTaskBoardDefaultLayout
        extend
        userTasks={userTasks}
        setUserTasks={setUserTasks}
        target={target}
        setTarget={setTarget}
      />
    </Box>
  )
}

export default CreateTaskBoardExtend

