import React, { useContext, useEffect } from 'react'
import { TaskProps } from 'lib/interface'
import Box from 'styled/Box'
import Button from 'styled/Button'
import ModifyBoardDefaultLayout from './defaultLayout'
import { ModalContext } from 'components/Modal/ModalContext'
import ModifyBoardExtend from './extend'
import Text from 'styled/Text'

interface Props {
  targetedTask: TaskProps
}

const ModifyBoard: React.FC<Props> = ({
  targetedTask,
}): JSX.Element => {
  const modalContext = useContext(ModalContext)

  useEffect(() => {
    if (modalContext.modalIsOpen) {
      modalContext.setModalContent(
        <Box width='50vw'>
          <ModifyBoardExtend
            targetedTask={targetedTask}
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
            targetedTask={targetedTask}
          />
        </>
        :
        <Text>
          No Tasks is founded. You must select one first.
        </Text>
      }
    </Box>
  )
}

export default ModifyBoard
