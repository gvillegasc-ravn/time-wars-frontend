import {
  AppShell,
  Avatar,
  Burger,
  Group,
  NavLink,
  Switch,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";
interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [opened, { toggle }] = useDisclosure();

  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  const location = useLocation();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group gap={16}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Title size="lg">Time Wars</Title>
          </Group>

          <Group gap={12}>
            <Switch
              label={
                colorScheme === "light" ? (
                  <FaSun size={20} />
                ) : (
                  <FaMoon size={20} />
                )
              }
              checked={colorScheme === "light"}
              onChange={toggleColorScheme}
            />
            <Avatar radius="xl" />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          href="/"
          label="Home"
          leftSection={<FaHouse />}
          active={location.pathname === "/"}
        />
        <NavLink
          href="/reports"
          label="Dashboard"
          leftSection={<FaChartBar />}
          active={location.pathname === "/reports"}
        />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
