import React from "react";
import { Layout } from "../../components/Layout";
import { TableReport } from "../../components/TableReport";


const data = [
  { time_entry: 'Start', time: '08:00', duration: '2' },
  { time_entry: 'Break', time: '10:00', duration: '0.5' },
  { time_entry: 'Work', time: '10:30', duration: '3.5' },
];

export const Home = () => {
  return <TableReport data={data} />;
};
