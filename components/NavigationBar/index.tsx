import React from 'react'
import styled from "styled-components";
import Box from 'styled/Box';
import tw from 'twin.macro';

const NavigationBarWrapper = styled(Box)`
  z-index: 50;
  border-color: black;
  border-left-width: 2px;
  border-top-width: 2px;
  border-bottom-width: 2px;
  ${tw`rounded-md mb-5`}

`

// interface Props {
//   children?: React.ReactNode
// }

const NavigationBar = (): JSX.Element => {
  return (
    <NavigationBarWrapper
      data-test="component-NavigationBar"
      my='5px'
      minWidth={['200px']}
      height="100%"
    >
      ggfdgfdg
    </NavigationBarWrapper >
  )
}

export default NavigationBar
