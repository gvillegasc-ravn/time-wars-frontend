import { AppShell, Burger, Group, NavLink, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";
import { ReactNode } from "react";
import { TbAdjustmentsAlt } from "react-icons/tb";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          ss
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          href="/"
          label="With icon"
          leftSection={<TbAdjustmentsAlt />}
          active
        />
        <NavLink
          href="#required-for-focus"
          label="With right section"
          leftSection={<TbAdjustmentsAlt />}
          rightSection={<TbAdjustmentsAlt />}
        />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
