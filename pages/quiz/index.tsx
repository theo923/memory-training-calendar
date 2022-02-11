import { refreshData } from "lib/utils/refresh_data";
import React, { useEffect } from "react";

const quizBook = (): JSX.Element => {
  useEffect(() => {
    refreshData('/quizBook/1', 'replace')
  }, [])
  return (<></>);
};

export default quizBook;
