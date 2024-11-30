import React from 'react';
import styles from './tablastyle.module.css';
import { Box, Button, Flex, Table } from '@mantine/core';
import { FaCheck } from "react-icons/fa";

export const TableReport: React.FC = () => {
  const das = [
    {
      result: true,
      data: [
        {
          id: 4,
          startTime: "2024-11-30T14:30:00Z",
          endTime: "2024-11-30T14:40:00Z",
          description: null,
          clientName: "Lucidchart",
          projectName: "Project A",
          userId: 3,
          userName: "Jackeline Quispe",
          approvedStatus: "PENDING",
        },
        {
          id: 3,
          startTime: "2024-11-30T14:30:00Z",
          endTime: null,
          description: null,
          clientName: "Lucidchart",
          projectName: "Project A",
          userId: 2,
          userName: "Gerardo Villegas",
          approvedStatus: "PENDING",
        },
        {
          id: 2,
          startTime: "2024-11-30T14:30:00Z",
          endTime: "2024-11-30T16:30:00Z",
          description: "Creating the repository",
          clientName: "Lucidchart",
          projectName: "Project A",
          userId: 1,
          userName: "Andre Gallegos",
          approvedStatus: "REJECTED",
        },
        {
          id: 1,
          startTime: "2024-11-30T19:30:00Z",
          endTime: null,
          description: null,
          clientName: "Lucidchart",
          projectName: "Project A",
          userId: 1,
          userName: "Andre Gallegos",
          approvedStatus: "REJECTED",
        },
      ],
      timestamp: "2024-11-30T11:08:02.803+00:00",
      status: 200,
    },
  ];

  const filteredData = das[0].data.filter((entry) => entry.endTime !== null);


  const calculateDuration = (start: string, end: string): number => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.abs(endDate.getTime() - startDate.getTime());
  };

  const totalDuration = filteredData.reduce((acc, entry) => {
    if (entry.endTime) {
      return acc + calculateDuration(entry.startTime, entry.endTime);
    }
    return acc;
  }, 0);

  const formatTotalDuration = (): string => {
    const hours = Math.floor(totalDuration / (1000 * 60 * 60));
    const minutes = Math.floor((totalDuration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const rows = filteredData.map((entry) => (
    <Table.Tr key={entry.id}>
      <Table.Td>{entry.description || "No Description"}</Table.Td>
      <Table.Td>{entry.userName}</Table.Td>
      <Table.Td>
      {`${new Date(entry.startTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })} - ${
        entry.endTime
          ? new Date(entry.endTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            })
          : ""
      }`}
      <br />
      {new Date(entry.startTime).toLocaleDateString([], {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      })}
    </Table.Td>
      <Table.Td>{`${Math.floor(calculateDuration(entry.startTime, entry.endTime || "") / (1000 * 60 * 60))}h ${
        Math.floor((calculateDuration(entry.startTime, entry.endTime || "") % (1000 * 60 * 60)) / (1000 * 60))
      }m`}</Table.Td>
      <Table.Td className={styles.check}>
        <FaCheck />
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>TIME ENTRY</Table.Th>
      <Table.Th>USER</Table.Th>
      <Table.Th>TIME</Table.Th>
      <Table.Th>DURATION</Table.Th>
    </Table.Tr>
  );

  return (
    <>
      <div className={styles.container}>
        <Button className={styles.buttom}>APPROVED</Button>
        <Button className={styles.buttom}>REJECTED</Button>
      </div>
      <Box>
        <Flex justify="space-between">
          <div>TOTAL: {formatTotalDuration()}</div>
          <div className={styles.rounding}>ROUNDING</div>
        </Flex>
      </Box>
      <Table captionSide="bottom" verticalSpacing="30px">
        <Table.Caption>Filtered Entries</Table.Caption>
        <Table.Thead>{ths}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
};


