import React from 'react';
import styles from './tablastyle.module.css'
import { Table } from '@mantine/core';


// Define la interfaz para los datos
interface TableRow {
  time_entry: string;
  time: string;
  duration: string;
}

// Define las props del componente
interface TableReportProps {
  data: TableRow[];
}

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

export const TableReport: React.FC<TableReportProps> = ({ data }) => {
  const totalDuration = data.reduce((acc, row) => acc + parseFloat(row.duration || "0"), 0);
  
  const head = (
    <Table.Tr>
      <Table.Th>TOTAL</Table.Th>
      <Table.Th></Table.Th>
      <Table.Th>EXPORT</Table.Th>
      <Table.Th></Table.Th>
      <Table.Th className={styles.rounding}>ROUNDING</Table.Th>
    </Table.Tr>
  );
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>TIME ENTRY</Table.Th>
      <Table.Th className={styles.user_time_duration}>USER</Table.Th>
      <Table.Th className={styles.user_time_duration}>TIME</Table.Th>
      <Table.Th className={styles.user_time_duration}>DURATION</Table.Th>
    </Table.Tr>
  );
  return (
    <Table captionSide="bottom" verticalSpacing='30px'>
      <Table.Caption>Some elements from periodic table</Table.Caption>
      <Table.Thead >{head}</Table.Thead>
      <Table.Thead >{ths}</Table.Thead>
      <Table.Tbody >{rows}</Table.Tbody>
      {/* <Table.Tfoot>{ths}</Table.Tfoot> */}
    </Table>
  );
};


