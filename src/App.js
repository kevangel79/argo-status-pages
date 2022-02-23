import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/AppStyle";
import Header from "./components/Header";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Card color="primary" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Lorem Ipsum
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default App;
