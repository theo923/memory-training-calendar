import { childNode } from 'lib/interface';
import React from 'react'
import Box from 'styled/Box';

interface Props {
  children?: childNode;
}

const MainComponent: React.FC<Props> = ({
  children
}) => {
  return (
    <Box
      data-test='component-mainComponent'
      height={['auto', 'auto', '1119px']}
      minWidth={["20px", '573px', "780px", "921px"]}
    >
      {children}
    </Box>
  )
}

export default MainComponent
