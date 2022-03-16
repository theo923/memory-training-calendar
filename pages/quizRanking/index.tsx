import { QUIZBOOK_RANKING_URL } from "lib/data/pageUrl";
import { refreshData } from "lib/utils/refresh_data";
import React, { useEffect } from "react";

const quizBook = (): JSX.Element => {
  useEffect(() => {
    refreshData(QUIZBOOK_RANKING_URL, 'replace')
  }, [])
  return (<></>);
};

export default quizBook;
