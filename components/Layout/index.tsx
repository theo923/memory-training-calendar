import { childNode } from "lib/interface";
import React from "react";
import Box from "styled/Box";
import Flex from "styled/Flex";
import Grid from "styled/Grid";

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
      <Flex width={["400px", "600px", '800px', "1000px"]}
        height='100%'
        flexDirection={['column', null, 'row']}
        justifyContent='center'
        alignItems='center'
      >
        {children}
      </Flex>
      <Box />
    </Grid>
  );
};

export default Layout;
