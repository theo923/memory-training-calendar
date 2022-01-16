import React, { useContext } from 'react'
import { TaskColorProps, TaskProps } from 'lib/interface'
import Box from 'styled/Box'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import { RiCloseCircleFill, RiDeleteBin5Line } from 'react-icons/ri'
import { ModalContext } from 'components/Modal/ModalContext'
import ModifyBoardDefaultLayout from './defaultLayout'
import axios from 'axios'
import { refreshData } from 'lib/utils/refresh_data'

interface Props {
  targetedTask: TaskProps,
  colorPalette: TaskColorProps,
  reload?: boolean
}

const ModifyBoardExtend: React.FC<Props> = ({
  targetedTask,
  colorPalette,
  reload = false
}): JSX.Element => {
  const modalContext = useContext(ModalContext)

  const handleDelete = async () => {
    await axios.post('/api/deleteTask', {
      id: targetedTask.id
    }).then(({ data: { success } }) => {
      if (success)
        refreshData('', 'reload')
    })
  }

  return (
    <Box data-test="modifyBoard-extend">
      <Flex justifyContent='flex-end'>
        <Button onClick={() => modalContext.setModalIsOpen(false)}>
          <RiCloseCircleFill size='20px' />
        </Button>
      </Flex>
      <Button onClick={() => handleDelete()}>
        <RiDeleteBin5Line />
      </Button>
      <ModifyBoardDefaultLayout
        targetedTask={targetedTask}
        colorPalette={colorPalette}
        reload={reload}
      />
    </Box>
  )
}

export default ModifyBoardExtend

