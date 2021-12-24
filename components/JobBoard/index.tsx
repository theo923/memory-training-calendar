import React from 'react'
import styled from "styled-components";
import Box from 'styled/Box';

const JobBoardWrapper = styled(Box)`
  z-index: 50;
  background-color: transparent;
`

interface Props {
  children?: React.ReactNode
}

const JobBoard: React.FC<Props> = ({ children }): JSX.Element => {
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
      {children}
    </JobBoardWrapper >
  )
}

export default JobBoard
