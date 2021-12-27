import Head from "next/head";
import React from "react";
import Layout from "../../components/Layout";
import RegisterPanel from "components/RegisterPanel";
import { NextRouter } from "next/router";

interface Props {
  router: NextRouter
}

const Register: React.FC<Props> = ({ router }): JSX.Element => {
  return (
    <>
      <Head>
        <title>Register | Memory Training Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <RegisterPanel router={router} />
      </Layout>
    </>
  );
};

export default Register;
