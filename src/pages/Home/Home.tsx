import React from "react";
import { Layout } from "../../components/Layout";
import { TableReport } from "../../components/TableReport";

export const Home = () => {
  return <Layout children={<TableReport />} />;
};
