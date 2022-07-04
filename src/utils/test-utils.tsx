/* eslint-disable import/prefer-default-export */
import { render, renderHook } from "@testing-library/react";
import React, { ReactElement } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import useMaterialTheme from "../hooks/useMaterialTheme";

function queryClientFactory() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return queryClient;
}

export function testWrapperFactory(component: ReactElement) {
  const queryClient = queryClientFactory();
  const theme = useMaterialTheme("light");

  return render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {component}
        </QueryClientProvider>
      </ThemeProvider>
    </LocalizationProvider>,
  );
}

export function queryWrapperFactory(customQueryHook: any, params?: any) {
  const queryClient = queryClientFactory();

  const wrapper: any = ({ children }: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return renderHook(() => customQueryHook(params), { wrapper });
}
