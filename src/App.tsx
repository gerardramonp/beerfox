import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline, Paper } from "@mui/material";
import MainLayout from "./ui/MainLayout";
import BeersPage from "./pages/BeersPage";
import ThemeContextProvider from "./contexts/ThemeContextProvider";

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
    <ThemeContextProvider>
      <QueryClientProvider client={queryClient}>
        {/* <Paper sx={{ height: "100vh", overflow: "auto" }}> */}
        <Paper sx={{ height: "100vh", overflow: "auto" }}>
          <MainLayout>
            <BeersPage />
          </MainLayout>
        </Paper>
      </QueryClientProvider>
    </ThemeContextProvider>
  </div>
);

export default App;
