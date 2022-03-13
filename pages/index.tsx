import Head from "next/head";
import React, { useEffect } from "react";
import { refreshData } from "lib/utils/refresh_data";
import { CALENDAR_URL } from "lib/data/pageUrl";


const App = (): JSX.Element => {

  useEffect(() => {
    refreshData(CALENDAR_URL)
  }, [])

  return (
    <>
      <Head>
        <title>Memory Training Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default App;
