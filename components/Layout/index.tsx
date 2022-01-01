import { childNode, UserSettingsProps } from "lib/interface";
import React from "react";
import Box from "styled/Box";
import Flex from "styled/Flex";
import Grid from "styled/Grid";
// import styled from "styled-components";
// import tw from 'twin.macro';
import GlassBox from "styled/GlassBox";
import styled, { css } from "styled-components";

const LayoutWrapper = styled(Grid) <any>`
  ${({ bColor }) => css`
    background: ${bColor}
  `}
`

interface Props {
  main?: boolean
  children?: childNode;
  userSettings?: UserSettingsProps;
}

const Layout: React.FC<Props> = ({ main, children, userSettings }): JSX.Element => {
  return (
    <LayoutWrapper
      data-test="component-layout"
      height='100%'
      gridTemplateColumns={['0.5fr 1fr 0.5fr']}
      bColor={userSettings?.bgColor || 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);'}
    >
      <Box />
      <Flex flexDirection={['column', null, 'row']}
        justifyContent='center'
        alignItems='center'
      >
        <GlassBox
          display='flex'
          flexDirection={['column', null, 'row']}
          justifyContent='center'
          height={main ? '100%' : 'auto'}

        >
          {children}
        </GlassBox>
      </Flex>
      <Box />
    </LayoutWrapper>
  );
};

export default Layout;
