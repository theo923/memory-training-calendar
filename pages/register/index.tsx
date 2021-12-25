import Head from "next/head";
import React from "react";
import Layout from "../../components/Layout";
import RegisterPanel from "components/RegisterPanel";


const Register = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Register | Memory Training Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <RegisterPanel />
      </Layout>
    </>
  );
};

export default Register;
