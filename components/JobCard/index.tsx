import React from 'react'
import Box from '../../styled/Box'
import Text from '../../styled/Text'
import Flex from '../../styled/Flex';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { setTextColor } from '../../lib/controller/controlColor';

const FullTaskContent = styled(Box) <{ setTaskColor: string }>`
    width: 100%;
    font-weight: 700;
    ${tw`border-2 border-black shadow-lg rounded-md px-2`}

  ${({ setTaskColor }) => css`
    background-color: ${setTaskColor || ''}
  `}
`

interface Props {
  taskTitle: string
  taskDescription: string
}

const JobCard: React.FC<Props> = ({
  taskTitle,
  taskDescription
}): JSX.Element => {
  return (
    <FullTaskContent
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
        <Text
          fontSize={['20px', null, '20px']}
          lineHeight={['20px', null, '28px']}
          color={setTextColor(6)}
        >
          {taskTitle}
        </Text>
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
