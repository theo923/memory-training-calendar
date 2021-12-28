import axios from 'axios'
import { setBooleanColor, setTextColor } from 'lib/controller/controlColor'
import { refreshData } from 'lib/utils/refresh_data'
import { NextRouter } from 'next/router'
import React from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'
import styled, { css } from 'styled-components'
import Box from 'styled/Box'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import Text from 'styled/Text'
import tw from 'twin.macro'


const FullTaskContent = styled(Box) <{ setTaskColor: string }>`
    width: 100%;
    font-weight: 700;
    ${tw`border-2 border-black shadow-lg rounded-md px-2`}

  ${({ setTaskColor }) => css`
    background-color: ${setTaskColor || ''}
  `}
`

interface Props {
  router: NextRouter
  taskID: string
  taskTitle: string
  taskDescription: string
  finished: boolean
}

const TaskCard: React.FC<Props> = ({
  router,
  taskID,
  taskTitle,
  taskDescription,
  finished
}): JSX.Element => {
  const handleSubmit = async () => {
    await axios.post('/api/deleteTask', {
      id: taskID
    }).then(({ data: { success } }) => {
      if (success)
        refreshData(router)
    })
  }

  return (
    <FullTaskContent
      data-test="component-TaskCard"
      padding={['3px']}
      my={['5px']}
      setTaskColor={"#fff"}
    >
      <Flex
        flexDirection='column'
        justifyContent='center'
        overflowX='hidden'
        width='100%'
      >
        <Flex justifyContent='space-between'>
          <Text
            fontSize={['20px', null, '20px']}
            lineHeight={['20px', null, '28px']}
            color={setBooleanColor(finished)}
          >
            {taskTitle}
          </Text>
          <Button onClick={() => handleSubmit()}>
            <RiDeleteBin5Line />
          </Button>
        </Flex>
        <Text
          fontSize={['15px', null, '15px']}
          lineHeight={['20px', null, '28px']}
          color={setTextColor(2)}
        >
          {taskDescription}
        </Text>
      </Flex>
    </FullTaskContent>
  )
}

export default TaskCard
