import Head from "next/head";
import React, { useEffect } from "react";
import { addDays } from "date-fns";
import { NextRouter } from "next/router";
import { getYearMonth } from "lib/get/getDate";
import { refreshData } from "lib/utils/refresh_data";

interface IndexProps {
  router: NextRouter
}

const App: React.FC<IndexProps> = ({ router }): JSX.Element => {
  useEffect(() => {
    refreshData(router, `/year/${getYearMonth(addDays(new Date(), 1))}`)
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
