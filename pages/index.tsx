import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import Calendar from "../components/Calendar";

const App: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Memory Training Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Calendar />
      </Layout>
    </>
  );
};

export default App;
