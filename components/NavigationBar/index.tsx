import { NextRouter } from 'next/router';
import React from 'react'
import styled from "styled-components";
import Box from 'styled/Box';
import Flex from 'styled/Flex';
import Text from 'styled/Text';
import tw from 'twin.macro';

const NavigationBarWrapper = styled(Box)`
  z-index: 50;
  ${tw`rounded-md`}
`

const Logo = styled(Text)`
`

interface Props {
  router: NextRouter
}

const NavigationBar: React.FC<Props> = ({ router }): JSX.Element => {
  return (
    <NavigationBarWrapper
      data-test="component-NavigationBar"
      minWidth={['100px', null, null, null, '200px']}
      height="100%"
    >
      <Flex
        flexDirection={['column', null, 'column']}
        justifyContent="center"
        alignItems="center"
        my={['5px']}
      >
        <Logo
          fontSize={['30px', null, null, null, '50px']}
        >
          M-T-C
        </Logo>
        <Box
          className='border-t-8 border-gray-300 rounded-lg shadow-xl'
          width='90%'
        />
        <Box
          onClick={() => router.push("/")}
          my={['0', null, '30px']}
        >
          <Text
            className='cursor-pointer'
            fontSize='20px'
          >
            Calendar</Text>
        </Box>
      </Flex>
    </NavigationBarWrapper >
  )
}

export default NavigationBar
