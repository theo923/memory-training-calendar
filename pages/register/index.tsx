import Head from "next/head";
import React from "react";
import Layout from "../../components/Layout";
import RegisterPanel from "components/RegisterPanel";
import Flex from "styled/Flex";
import GlassBox from "styled/GlassBox";

const Register = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Register | Memory Training Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex
          height='100%'
          width='100%'
          justifyContent='center'
        >
          <GlassBox>
            <RegisterPanel />
          </GlassBox>
        </Flex>
      </Layout>
    </>
  );
};

export default Register;
