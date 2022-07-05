/* eslint-disable import/prefer-default-export */
import { render, renderHook } from "@testing-library/react";
import React, { ReactElement } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { QueryClient, QueryClientProvider } from "react-query";
import ThemeContextProvider from "../contexts/ThemeContextProvider";
import { BeerABVContextProvider } from "../contexts/BeerABVContextProvider";

function queryClientFactory() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
}

export function testWrapperFactory(component: ReactElement) {
  const queryClient = queryClientFactory();

  return render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeContextProvider>
        <BeerABVContextProvider>
          <QueryClientProvider client={queryClient}>
            {component}
          </QueryClientProvider>
        </BeerABVContextProvider>
      </ThemeContextProvider>
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

export const queryResponseFactory = (
  isLoading: boolean = true,
  isError: boolean = false,
  data: any = undefined,
  refetch: any = jest.fn(),
) => ({
  isLoading,
  isFetching: isLoading,
  isError,
  data,
  refetch,
});
