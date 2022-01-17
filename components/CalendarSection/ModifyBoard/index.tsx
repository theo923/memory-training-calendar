import React, { useContext, useEffect } from 'react'
import { TaskColorProps, TaskProps, UserProps } from 'lib/interface'
import Box from 'styled/Box'
import Button from 'styled/Button'
import ModifyBoardDefaultLayout from './defaultLayout'
import { ModalContext } from 'components/Modal/ModalContext'
import ModifyBoardExtend from './extend'

interface Props {
  currentUser: UserProps,
  targetedTask: TaskProps,
  colorPalette: TaskColorProps,
}

const ModifyBoard: React.FC<Props> = ({
  currentUser,
  targetedTask,
  colorPalette,
}): JSX.Element => {
  const modalContext = useContext(ModalContext)

  useEffect(() => {
    if (modalContext.modalIsOpen) {
      modalContext.setModalContent(
        <Box width='50vw'>
          <ModifyBoardExtend
            currentUser={currentUser}
            targetedTask={targetedTask}
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
    <Box data-test="component-modifyBoard">
      {targetedTask?.id ?
        <>
          <Button onClick={() => modalContext.setModalIsOpen(true)}>Extend</Button>
          <ModifyBoardDefaultLayout
            currentUser={currentUser}
            targetedTask={targetedTask}
            colorPalette={colorPalette}
          />
        </>
        :
        <Box>
          No Tasks is founded. You must select one first.
        </Box>
      }
    </Box>
  )
}

export default ModifyBoard
