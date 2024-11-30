import React, { useEffect, useState } from "react";
import styles from "./tablastyle.module.css";
import { Box, Button, Flex, Table } from "@mantine/core";
import { FaCheck } from "react-icons/fa";

type Entry = {
  id: number;
  startTime: string;
  endTime: string | null;
  description: string | null;
  clientName: string;
  projectName: string;
  userName: string;
};

export const TableReport: React.FC = () => {
  const [listData, setListData] = useState<Entry[]>([]);

  const filteredData = listData.filter((entry) => entry.endTime !== null);

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
    const minutes = Math.floor(
      (totalDuration % (1000 * 60 * 60)) / (1000 * 60)
    );
    return `${hours}h ${minutes}m`;
  };

  const rows = filteredData.map((entry) => (
    <Table.Tr key={entry.id}>
      <Table.Td>{entry.description || "No Description"}</Table.Td>
      <Table.Td>{entry.userName}</Table.Td>
      <Table.Td>
        {`${new Date(entry.startTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })} - ${
          entry.endTime
            ? new Date(entry.endTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })
            : ""
        }`}
        <br />
        {new Date(entry.startTime).toLocaleDateString([], {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })}
      </Table.Td>
      <Table.Td>{`${Math.floor(
        calculateDuration(entry.startTime, entry.endTime || "") /
          (1000 * 60 * 60)
      )}h ${Math.floor(
        (calculateDuration(entry.startTime, entry.endTime || "") %
          (1000 * 60 * 60)) /
          (1000 * 60)
      )}m`}</Table.Td>
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

  useEffect(() => {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    };

    fetch(
      "https://faithful-literate-chigger.ngrok-free.app/api/v1/time-entries/get-all",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          console.log(result.data);

          setListData(result.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);
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
