/* eslint-disable import/prefer-default-export */
import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { muiTheme } from "../ui/themeOptions";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export function testWrapperFactory(component: ReactElement) {
  return render(
    <ThemeProvider theme={muiTheme}>
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    </ThemeProvider>,
  );
}
