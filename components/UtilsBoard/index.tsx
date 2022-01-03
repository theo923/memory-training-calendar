import React, { useState } from 'react'
import styled from "styled-components";
import Box from 'styled/Box';
import Flex from 'styled/Flex';
import "twin.macro"
import { MdOpenInFull, MdOutlineCloseFullscreen } from 'react-icons/md';

const UtilsBoardWrapper = styled(Box)`
  z-index: 50;
  background-color: transparent;
`

interface Props {
  children?: React.ReactNode
}

const UtilsBoard: React.FC<Props> = ({ children }): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <UtilsBoardWrapper
      data-test="component-UtilsBoard"
      m={['10px']}
      // @ts-ignore
      position='fixed'
      background={['white']}
      width={['90vw', null, 'auto']}
      right={['0']}
      top={['0', null, 'auto']}
      bottom={['auto', null, '0']}
    >
      {!open &&
        <Flex
          my='5px'
          justifyContent='flex-end'
        >
          <MdOpenInFull
            tw='cursor-pointer'
            onClick={() => setOpen(true)}
            size="25px"
          />
        </Flex>
      }
      {open &&
        <Flex
          my='5px'
          justifyContent='flex-end'
        >
          <MdOutlineCloseFullscreen
            tw='cursor-pointer'
            onClick={() => setOpen(false)}
            size="25px" />
        </Flex>
      }
      {open && children}
    </UtilsBoardWrapper >
  )
}

export default UtilsBoard
