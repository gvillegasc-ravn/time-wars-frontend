import { Box, Flex, Text, Title } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import "@mantine/charts/styles.css";
import styles from "./reports.module.css";

import dayjs from "dayjs";
import { useEffect, useState } from "react";

type Entry = {
  id: number;
  startTime: string;
  endTime: string | null;
  description: string | null;
  clientName: string;
  projectName: string;
};

const formatTime = (hours: number) => {
  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  const s = Math.floor(((hours - h) * 60 - m) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
    s
  ).padStart(2, "0")}`;
};

const getTotalHoursPerDay = (entries: Entry[]) => {
  const daysOfWeek = [
    { name: "Mon", index: 1 },
    { name: "Tue", index: 2 },
    { name: "Wed", index: 3 },
    { name: "Thu", index: 4 },
    { name: "Fri", index: 5 },
    { name: "Sat", index: 6 },
    { name: "Sun", index: 0 },
  ];

  const hoursByDay: { [key: string]: number } = {};

  const validEntries = entries.filter((entry) => entry.endTime);

  validEntries.forEach((entry) => {
    const startTime = dayjs(entry.startTime);
    const endTime = dayjs(entry.endTime);

    const hours = endTime.diff(startTime, "hour", true); // get decimal hours
    console.log({ hours });

    const day = startTime.format("ddd, MMM D");

    if (hoursByDay[day]) {
      hoursByDay[day] += hours;
    } else {
      hoursByDay[day] = hours;
    }
  });

  const completeHoursByDay = daysOfWeek.map(({ name, index }) => {
    const formattedDay = dayjs().day(index).format("ddd, MMM D");

    return {
      day: name,
      hours: hoursByDay[formattedDay] || 0,
      formattedTime: formatTime(hoursByDay[formattedDay] || 0),
    };
  });

  return completeHoursByDay;
};

const sumHours = (days: { day: string; hours: number }[]) => {
  return days.reduce((total, item) => total + item.hours, 0);
};

const formatTotalHours = (totalHours: number) => {
  return formatTime(totalHours);
};

export const Reports = () => {
  const [listData, setListData] = useState<Entry[]>([]);
  const [data, setData] = useState<{ day: string; hours: number }[]>([]);
  const [totalHours, setTotalHours] = useState<number>(0);

  useEffect(() => {
    fetch(
      "https://faithful-literate-chigger.ngrok-free.app/api/v1/time-entries/get-all",
      {
        method: "GET",
        redirect: "follow",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      }
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

  useEffect(() => {
    const totalData = getTotalHoursPerDay(listData);
    setData(totalData);
    setTotalHours(sumHours(totalData));
  }, [listData]);

  return (
    <Flex direction="column" gap={30} pt={6} pb={6}>
      <Box>
        <Title fw={600} fz={24}>
          Dashboard
        </Title>
      </Box>
      <Box>
        <Box className={styles.containerDetail}>
          <Box className={styles.cardDetail}>
            <Text ta="center" className={styles.titleCard} size="sm">
              Total time
            </Text>
            <Text ta="center" fz={25} fw="600">
              {formatTotalHours(totalHours)}
            </Text>
          </Box>
          <Box className={styles.cardDetail} size="sm">
            <Text ta="center" className={styles.titleCard}>
              Top project
            </Text>
            <Text ta="center" fz={25} fw="600">
              Ravn
            </Text>
          </Box>
          <Box className={styles.cardDetail} size="sm">
            <Text ta="center" className={styles.titleCard}>
              Top Client
            </Text>
            <Text ta="center" fz={25} fw="600">
              Ravn
            </Text>
          </Box>
        </Box>
        <Box className={styles.containerChart}>
          <BarChart
            h={300}
            data={data}
            dataKey="day"
            series={[{ name: "hours", color: "violet.6" }]}
            tooltipProps={{
              content: ({ active, payload }) => {
                if (active && payload && payload.length) {
                  const { day, formattedTime } = payload[0].payload;
                  return (
                    <Flex
                      gap={12}
                      justify="space-between"
                      className={styles.tooltip}
                      align="center"
                    >
                      <Text size="xs">{day}</Text>
                      <Text fw={600} size="sm">
                        {formattedTime}
                      </Text>
                    </Flex>
                  );
                }
                return null;
              },
            }}
          />
        </Box>
      </Box>
    </Flex>
  );
};
