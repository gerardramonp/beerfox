/* eslint-disable import/prefer-default-export */
import { render, renderHook } from "@testing-library/react";
import React, { ReactElement } from "react";

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
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    </ThemeProvider>,
  );
}

export function queryWrapperFactory(customQueryHook: any) {
  const queryClient = queryClientFactory();

  const wrapper: any = ({ children }: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return renderHook(() => customQueryHook(), { wrapper });
}
