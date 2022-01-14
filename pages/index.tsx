import Head from "next/head";
import React, { useEffect } from "react";
import { addDays } from "date-fns";
import { getYearMonth } from "lib/get/getDate";
import { refreshData } from "lib/utils/refresh_data";


const App = (): JSX.Element => {

  useEffect(() => {
    refreshData(`/year/${getYearMonth(addDays(new Date(), 1))}`)
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
