import Head from "next/head";
import React, { useEffect } from "react";
import { addDays } from "date-fns";
import { NextRouter, useRouter } from "next/router";
import { getYearMonth } from "lib/get/getDate";

const App = (): JSX.Element => {
  const router: NextRouter = useRouter()
  useEffect(() => {
    router.push({
      pathname: `/year/${getYearMonth(addDays(new Date(), 1))}`,
    })
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
