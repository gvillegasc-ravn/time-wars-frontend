import { em, MantineThemeOverride, rem } from "@mantine/core";

const BREAKPOINTS: Record<string, number> = {
  md: 800,
  lg: 1300,
};

export const themeOverride: MantineThemeOverride = {
  fontFamily: "Roboto",
  fontFamilyMonospace: "Roboto",

  headings: {
    sizes: {
      h1: {
        fontSize: rem(40),
        lineHeight: "1.2",
      },
      h2: {
        fontSize: rem(32),
        lineHeight: "1.35",
      },
      h3: {
        fontSize: rem(24),
        lineHeight: "1.33",
      },
      h4: {
        fontSize: rem(18),
        lineHeight: "1.8",
      },
      h5: {
        fontSize: rem(16),
        lineHeight: "1.25",
      },
      h6: {
        fontSize: rem(12),
        lineHeight: "1.33",
      },
    },
  },
  fontSizes: {
    xxs: rem(10),
    xs: rem(12),
    sm: rem(14),
    md: rem(15),
    lg: rem(18),
    xl: rem(20),
  },

  breakpoints: { md: em(BREAKPOINTS.md), lg: em(BREAKPOINTS.lg) },
};
