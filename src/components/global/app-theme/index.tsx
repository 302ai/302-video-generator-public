"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

type AppThemeProps = {
  children: ReactNode;
  theme: string;
};

const AppTheme = ({ children, theme }: AppThemeProps) => {
  return (
    <NextThemesProvider defaultTheme={theme} attribute="class">
      {children}
    </NextThemesProvider>
  );
};

export default AppTheme;
