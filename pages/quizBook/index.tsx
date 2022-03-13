import { QUIZBOOK_URL } from "lib/data/pageUrl";
import { refreshData } from "lib/utils/refresh_data";
import React, { useEffect } from "react";

const quizBook = (): JSX.Element => {
  useEffect(() => {
    refreshData(QUIZBOOK_URL, 'replace')
  }, [])
  return (<></>);
};

export default quizBook;
