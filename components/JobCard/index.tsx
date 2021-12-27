import axios from 'axios'
import { setTextColor } from 'lib/controller/controlColor'
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
}

const JobCard: React.FC<Props> = ({
  router,
  taskID,
  taskTitle,
  taskDescription
}): JSX.Element => {

  const handleSubmit = async () => {
    await axios.post('/api/deleteTask', {
      id: taskID
    }).then(({ data: { success } }) => {
      if (success) {
        router.reload()
      }
    })
  }

  return (
    <FullTaskContent
      data-test="component-jobCard"
      padding={['3px']}
      my={['5px']}
      setTaskColor={"#2563eb"}
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
            color={setTextColor(6)}
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
          color={setTextColor(6)}
        >
          {taskDescription}
        </Text>
      </Flex>
    </FullTaskContent>
  )
}

export default JobCard
