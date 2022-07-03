import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, CssBaseline, Paper, ThemeProvider } from "@mui/material";
import MainLayout from "./ui/MainLayout";
import { themeOptions } from "./ui/themeOptions";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const muiTheme = createTheme(themeOptions);

const App = () => (
  <div className="App">
    <CssBaseline />
    <ThemeProvider theme={muiTheme}>
      <QueryClientProvider client={queryClient}>
        <Paper sx={{ height: "100vh", overflow: "auto" }}>
          <MainLayout>
            <span>content</span>
          </MainLayout>
        </Paper>
      </QueryClientProvider>
    </ThemeProvider>
  </div>
);

export default App;
