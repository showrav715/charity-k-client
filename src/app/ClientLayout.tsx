
import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { theme } from "../theme";
import { IChildren } from "./interfaces/interfaces";

const ClientLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <ThemeProvider value={theme}>
      {children}
    </ThemeProvider>
  );
};

export default ClientLayout;
