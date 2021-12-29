import Head from "next/head";
import React from "react";
import { NextRouter } from "next/router";
import Layout from "components/Layout";
import NavigationBar from "components/NavigationBar";
import MainComponent from "components/MainComponent";
import Dashboard from "components/Dashboard";

interface Props {
  router: NextRouter
}

const dashboard: React.FC<Props> = ({ router }): JSX.Element => {

  return (
    <>
      <Head>
        <title>Dashboard | Memory Training Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <NavigationBar router={router} />
        <MainComponent>
          <Dashboard />
        </MainComponent>
      </Layout>
    </>
  );
};

export default dashboard;
