import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { theme } from './styles/AppStyle'
import { useEffect, useState } from 'react';
import {getStatusServiceGroup} from './api/Manager';


function App() {
  const [groupStatus, setGroupStatus] = useState({});

  useEffect (() =>{
    getStatusServiceGroup().then(response => setGroupStatus(response));
  },[]);

  return (
    <ThemeProvider theme={theme}>
      <Button>Press</Button>
    </ThemeProvider>
  );
}

export default App;
