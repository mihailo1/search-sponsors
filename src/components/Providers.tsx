import { ThemeProvider, createTheme } from "@mui/material/styles";
import { HTMLAttributes } from "react";

const Providers = ({ children }: HTMLAttributes<HTMLElement>) => (
  <ThemeProvider
    theme={createTheme({
      palette: {
        mode: "dark",
        primary: {
          main: "#ffffff3b",
        },
      },
    })}
  >
    {children}
  </ThemeProvider>
);

export default Providers;
