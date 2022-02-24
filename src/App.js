import { ThemeProvider } from "@mui/material/styles";

import { theme } from "./styles/AppStyle";
import Header from "./components/Header";
import StatusTable from "./components/StatusTable";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <StatusTable CardHeaderTitle="Current Status by Service" />
    </ThemeProvider>
  );
}

export default App;
