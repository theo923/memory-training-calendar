import { TODOLIST_URL } from "lib/data/pageUrl";
import { refreshData } from "lib/utils/refresh_data";
import React, { useEffect } from "react";

const todoList = (): JSX.Element => {
  useEffect(() => {
    refreshData(TODOLIST_URL, 'replace')
  }, [])
  return (<></>);
};

export default todoList;
