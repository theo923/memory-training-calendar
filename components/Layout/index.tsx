import { childNode } from "lib/interface";
import React from "react";
import Box from "styled/Box";
import Flex from "styled/Flex";
import Grid from "styled/Grid";
import styled from "styled-components";
import tw from 'twin.macro';

const LayoutWrapper = styled(Flex)`
  border: 2px solid #000;
  ${tw`rounded-md shadow-2xl`}

`

interface Props {
  children?: childNode;
}

const Layout: React.FC<Props> = ({ children }): JSX.Element => {
  return (
    <Grid
      data-test="component-layout"
      height='100%'
      gridTemplateColumns={['0.5fr 1fr 0.5fr']}
    >

      <Box />
      <Flex flexDirection={['column', null, 'row']}
        justifyContent='center'
        alignItems='center'
      >
        <LayoutWrapper
          flexDirection={['column', null, 'row']}
          justifyContent='center'
          alignItems='center'
          height={['auto', 'auto', '857px']}
        >
          {children}
        </LayoutWrapper>
      </Flex>
      <Box />
    </Grid>
  );
};

export default Layout;
