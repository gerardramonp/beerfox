import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline, Paper } from "@mui/material";
import MainLayout from "./ui/MainLayout";

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
    <QueryClientProvider client={queryClient}>
      <Paper sx={{ height: "100vh", overflow: "auto" }}>
        <MainLayout>
          <span>content</span>
        </MainLayout>
      </Paper>
    </QueryClientProvider>
  </div>
);

export default App;
