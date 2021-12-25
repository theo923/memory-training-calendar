import Head from "next/head";
import React from "react";
import Layout from "../../components/Layout";
import LoginPanel from "components/LoginPanel";


const App = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Login | Memory Training Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <LoginPanel />
      </Layout>
    </>
  );
};

export default App;
