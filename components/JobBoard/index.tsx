import React, { useState } from 'react'
import styled from "styled-components";
import Box from 'styled/Box';
import Flex from 'styled/Flex';
import "twin.macro"
import { MdOpenInFull, MdOutlineCloseFullscreen } from 'react-icons/md';

const JobBoardWrapper = styled(Box)`
  z-index: 50;
  background-color: transparent;
`

interface Props {
  children?: React.ReactNode
}

const JobBoard: React.FC<Props> = ({ children }): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <JobBoardWrapper
      data-test="component-jobBoard"
      m={['10px']}
      // @ts-ignore
      position={['sticky', null, 'fixed']}
      background={['white']}
      width={['90vw', null, 'auto']}
      right={['0']}
      top={['auto', null, '0']}
      bottom={['0', null, 'auto']}
    >
      {!open && <MdOpenInFull
        tw='cursor-pointer my-2'
        onClick={() => setOpen(true)}
        size="25px"
      />
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
    </JobBoardWrapper >
  )
}

export default JobBoard
