import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    // @ts-ignore
    twitch: {
      light: "#9147FF",
      main: "#9147FF",
      dark: "#9147FF",
      contrastText: "#FFFFFF",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});
