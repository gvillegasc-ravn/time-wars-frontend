import { Box, Flex, Text, Title } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import "@mantine/charts/styles.css";
import styles from "./reports.module.css";

const data = [
  { month: "January", Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: "February", Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: "March", Smartphones: 400, Laptops: 1000, Tablets: 200 },
  { month: "April", Smartphones: 1000, Laptops: 200, Tablets: 800 },
  { month: "May", Smartphones: 800, Laptops: 1400, Tablets: 1200 },
  { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
];
export const Reports = () => {
  return (
    <Flex direction="column">
      <Box>
        <Title>Dashboard</Title>
      </Box>
      <Box className={styles.containerDetail}>
        <Box className={styles.cardDetail}>
          <Text ta="center" className={styles.titleCard} size="sm">
            Total time
          </Text>
          <Text ta="center" fz={25} fw="600">
            40:31:09
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
          dataKey="month"
          series={[{ name: "Smartphones", color: "violet.6", stackId: "a" }]}
        />
      </Box>
    </Flex>
  );
};
