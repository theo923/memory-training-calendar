import React, { useContext } from 'react'
import { TaskColorProps, TaskProps } from 'lib/interface'
import Box from 'styled/Box'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import { RiCloseCircleFill } from 'react-icons/ri'
import { ModalContext } from 'components/Modal/ModalContext'
import ModifyBoardDefaultLayout from './defaultLayout'

interface Props {
  targetedTask: TaskProps,
  colorPalette: TaskColorProps,
}

const ModifyBoardExtend: React.FC<Props> = ({
  targetedTask,
  colorPalette,
}): JSX.Element => {
  const modalContext = useContext(ModalContext)

  return (
    <Box data-test="modifyBoard-extend">
      <Flex justifyContent='flex-end'>
        <Button onClick={() => modalContext.setModalIsOpen(false)}><RiCloseCircleFill size='20px' /></Button>
      </Flex>
      <ModifyBoardDefaultLayout
        targetedTask={targetedTask}
        colorPalette={colorPalette}
      />
    </Box>
  )
}

export default ModifyBoardExtend

