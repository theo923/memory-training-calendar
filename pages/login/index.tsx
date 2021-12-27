import Head from "next/head";
import React from "react";
import Layout from "../../components/Layout";
import LoginPanel from "components/LoginPanel";
import { NextRouter } from "next/router";

interface Props {
  router: NextRouter
}

const Login: React.FC<Props> = ({ router }): JSX.Element => {
  return (
    <>
      <Head>
        <title>Login | Memory Training Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <LoginPanel router={router} />
      </Layout>
    </>
  );
};

export default Login;
