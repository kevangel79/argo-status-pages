import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/AppStyle'
import { useEffect, useState } from 'react';
import {getStatusServiceGroup} from './api/Manager';
import Header from "./components/Header";
import StatusTable from "./components/StatusTable";

function App() {
  const [groupStatus, setGroupStatus] = useState({});

  useEffect (() =>{
    getStatusServiceGroup().then(response => setGroupStatus(response));
  },[]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <StatusTable CardHeaderTitle="Current Status by Service" />
    </ThemeProvider>
  );
}

export default App;
