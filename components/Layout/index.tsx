import React from "react";
import { childNode } from "../../interface";
import Box from "../../styled/Box";
import Flex from "../../styled/Flex";
import Grid from "../../styled/Grid";

interface Props {
  children?: any;
}

const Layout: React.FC<Props> = ({ children }): JSX.Element => {
  return (
    <Grid
      data-test="component-layout"
      height='100%'
      gridTemplateColumns={['1fr 1fr 1fr']}
    >
      <Box />
      <Flex width={["400px", "600px", "800px", "1300px"]}
        height='100%'
        flexDirection='column'
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
