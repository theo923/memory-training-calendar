import Head from "next/head";
import React from "react";
import Layout from "../../components/Layout";
import LoginPanel from "components/LoginPanel";
import Flex from "styled/Flex";
import GlassBox from "styled/GlassBox";

const Login = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Login | Memory Training Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex
          height='100%'
          width='100%'
          justifyContent='center'
        >
          <GlassBox>
            <LoginPanel />
          </GlassBox>
        </Flex>
      </Layout>
    </>
  );
};

export default Login;
