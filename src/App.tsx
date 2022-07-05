import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline, Paper } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Toaster } from "react-hot-toast";
import { useWindowSize } from "react-use";
import MainLayout from "./ui/MainLayout";
import BeersPage from "./pages/BeersPage";
import ThemeContextProvider from "./contexts/ThemeContextProvider";
import Footer from "./ui/Footer";
import { BeerABVContextProvider } from "./contexts/BeerABVContextProvider";
import { BREAKPOINT_SM } from "./ui/themeOptions";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const { width } = useWindowSize();

  return (
    <div className="App">
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeContextProvider>
          <BeerABVContextProvider>
            <QueryClientProvider client={queryClient}>
              <Paper
                sx={{
                  flex: 1,
                  minHeight: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <MainLayout>
                  <BeersPage />
                </MainLayout>
                <Footer />
              </Paper>
            </QueryClientProvider>
          </BeerABVContextProvider>
        </ThemeContextProvider>
      </LocalizationProvider>
      <Toaster
        position={width >= BREAKPOINT_SM ? "top-center" : "bottom-center"}
      />
    </div>
  );
};

export default App;
