import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StyledEngineProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { MantineProvider } from "@mantine/core";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <StyledEngineProvider>
        <SnackbarProvider
          style={{ zIndex: 9999 }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <App />
        </SnackbarProvider>
      </StyledEngineProvider>
    </MantineProvider>
  </React.StrictMode>
);