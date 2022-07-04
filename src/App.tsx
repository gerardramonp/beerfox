import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline, Paper } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MainLayout from "./ui/MainLayout";
import BeersPage from "./pages/BeersPage";
import ThemeContextProvider from "./contexts/ThemeContextProvider";
import Footer from "./components/Footer/Footer";
import { BeerABVContextProvider } from "./contexts/BeerABVContextProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
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
  </div>
);

export default App;
