import { Input } from "@mantine/core";

export const Header = () => {
  return (
    <div>
      <Input
        placeholder="Search"
        leftSection={<i className="ri-search-line"></i>}
        size="xl"
      />
    </div>
  );
};
