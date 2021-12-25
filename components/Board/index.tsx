import { remove_cookie } from 'lib/utils/remove_cookie'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from 'react-icons/fa'
import { RiLoginBoxLine, RiLogoutBoxLine } from 'react-icons/ri'
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
  type?: string
}

const Board: React.FC<Props> = ({
  title,
  children,
  type = ''
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
        {!type && open &&
          <Button onClick={() => setOpen(prev => !prev)}>
            <FaCompressArrowsAlt size='20px' />
          </Button>
        }
        {!type && !open &&
          <Button onClick={() => setOpen(prev => !prev)}>
            <FaExpandArrowsAlt size='20px' />
          </Button>
        }
        {type === 'login' &&
          <Button>
            <Link href='/login'>
              <Box>
                <RiLoginBoxLine size='20px' />
              </Box>
            </Link>
          </Button>
        }
        {type === 'register' &&
          <Button>
            <Link href='/register'>
              <Box>
                <RiLoginBoxLine size='20px' />
              </Box>
            </Link>
          </Button>
        }
        {type === 'logout' &&
          <Button onClick={() => remove_cookie()} >
            <Link href='/'>
              <Box>
                <RiLogoutBoxLine size='20px' />
              </Box>
            </Link>
          </Button>
        }
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
