import React, { useState } from 'react'
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from 'react-icons/fa'
import styled from 'styled-components'
import Box from 'styled/Box'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import Text from 'styled/Text'
import tw from 'twin.macro'


const Wrapper = styled(Box)`
  background-color: white;
  ${tw`border-2 border-black shadow-md rounded-md px-2 py-1 mb-5`}
`

interface Props {
  title: string,
  children?: React.ReactNode,
}


const Board: React.FC<Props> = ({
  title,
  children,
}): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Wrapper data-test="component-board">
      <Flex justifyContent='space-between' alignItems='center'>
        <Box mr='5px'>
          <Text fontSize={'20px'} fontWeight='600'>
            {title}
          </Text>
        </Box>
        <Button onClick={() => setOpen(prev => !prev)}>
          {open ?
            <FaCompressArrowsAlt size='20px' />
            :
            <FaExpandArrowsAlt size='20px' />}
        </Button>
      </Flex>
      {
        open &&
        <Box
          width={['100%', null, '40vw', '40vw', '20vw']}
          height={['100%', null, '85%']}
        >
          {children}
        </Box>
      }
    </Wrapper>
  )
}

export default Board
