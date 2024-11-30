import React, { useEffect, useState } from "react";
import styles from "./tablaReport.module.css";
import { Box, Button, Flex, Switch, Table, Text } from "@mantine/core";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

type Entry = {
  id: number;
  startTime: string;
  endTime: string | null;
  description: string | null;
  clientName: string;
  projectName: string;
  userName: string;
  approvedStatus: "APPROVED" | "REJECTED";
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
      <Table.Td align="center">{`${Math.floor(
        calculateDuration(entry.startTime, entry.endTime || "") /
          (1000 * 60 * 60)
      )}h ${Math.floor(
        (calculateDuration(entry.startTime, entry.endTime || "") %
          (1000 * 60 * 60)) /
          (1000 * 60)
      )}m`}</Table.Td>
      <Table.Td className={styles.check}>
        {entry.approvedStatus ? (
          entry.approvedStatus === "APPROVED" ? (
            <FaRegCheckCircle size={20} color="green" />
          ) : (
            <MdOutlineCancel size={20} color="red" />
          )
        ) : (
          ""
        )}
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>TIME ENTRY</Table.Th>
      <Table.Th>USER</Table.Th>
      <Table.Th>TIME</Table.Th>
      <Table.Th align="center">DURATION</Table.Th>
    </Table.Tr>
  );

  const handleClick = (status: number) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      approvedStatus: status,
      userId: 1,
    });

    fetch(
      "https://faithful-literate-chigger.ngrok-free.app/api/v1/time-entries/change-approved-status",
      {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setListData(result.data);
        }
      })
      .catch((error) => console.error(error));
  };

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
          setListData(result.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <Flex direction="column" gap="18px">
      <Flex justify="flex-end">
        <Flex gap={16}>
          <Button className={styles.buttom} onClick={() => handleClick(1)}>
            APPROVED
          </Button>
          <Button
            className={styles.buttom}
            onClick={() => handleClick(0)}
            color="red"
          >
            REJECTED
          </Button>
        </Flex>
      </Flex>
      <Box>
        <Box className={styles.containerHeader}>
          <Flex justify="space-between" align="center">
            <Box className={styles.containerTotal}>
              <Text size="xs" fw={500}>
                TOTAL:{" "}
                <Text span size="md" fw={600}>
                  {formatTotalDuration()}
                </Text>
              </Text>
            </Box>
            <Switch defaultChecked label="Rounding" />
          </Flex>
        </Box>
        <Table
          captionSide="bottom"
          verticalSpacing="16px"
          withTableBorder
          horizontalSpacing="lg"
        >
          <Table.Caption></Table.Caption>
          <Table.Thead>{ths}</Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </Flex>
  );
};
