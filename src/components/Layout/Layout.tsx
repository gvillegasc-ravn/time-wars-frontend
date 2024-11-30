import {
  AppShell,
  Box,
  Burger,
  Button,
  Group,
  NavLink,
  Paper,
  Skeleton,
  Switch,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import { TbAdjustmentsAlt } from "react-icons/tb";
import { FaHouse } from "react-icons/fa6";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [opened, { toggle }] = useDisclosure();

  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Box>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Title size="lg">Time Wars</Title>
          </Box>

          <Switch
            label={colorScheme === "light" ? "Light mode" : "Dark mode"}
            checked={colorScheme === "light"}
            onChange={toggleColorScheme}
          />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink href="/" label="Home" leftSection={<FaHouse />} active />
        <NavLink
          href="/reports"
          label="With right section"
          leftSection={<TbAdjustmentsAlt />}
        />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
