import React, { useContext } from 'react'
import { TaskProps } from 'lib/interface'
import Box from 'styled/Box'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import { RiCloseCircleFill, RiDeleteBin5Line } from 'react-icons/ri'
import { ModalContext } from 'components/Modal/ModalContext'
import ModifyBoardDefaultLayout from './defaultLayout'
import axios from 'axios'
import { refreshData } from 'lib/utils/refresh_data'
import { UserContext } from 'components/User'

interface Props {
  targetedTask: TaskProps,
  reload?: boolean
}

const ModifyBoardExtend: React.FC<Props> = ({
  targetedTask,
  reload = false
}): JSX.Element => {
  const modalContext = useContext(ModalContext)
  const userInfo = useContext(UserContext)

  const handleDelete = async () => {
    await axios.post('/api/deleteTask', {
      userID: userInfo?.user?.id,
      userName: userInfo?.user?.username,
      id: targetedTask.id,
      ip: userInfo?.user?.ip
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
        extend
        targetedTask={targetedTask}
        reload={reload}
      />
    </Box>
  )
}

export default ModifyBoardExtend

