import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import Layout from "../components/Layout";
import Calendar from "../components/Calendar";
import JobBoard from "../components/JobBoard";
import Grid from "../styled/Grid";

const App: NextPage = (): JSX.Element => {
  const [target, setTarget] = useState(new Date());
  const [userTasks, setUserTasks] = useState({})

  return (
    <>
      <Head>
        <title>Memory Training Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Calendar
          target={target}
          setTarget={setTarget}
        />
        <JobBoard
          userTasks={userTasks}
          setUserTasks={setUserTasks}
          target={target}
          setTarget={setTarget}
        />
      </Layout>
    </>
  );
};

export default App;
