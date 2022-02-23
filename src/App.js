import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { theme } from './styles/AppStyle'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button>Press</Button>
    </ThemeProvider>
  );
}

export default App;
