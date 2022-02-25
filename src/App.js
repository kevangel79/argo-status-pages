import { useEffect, useState } from 'react';
import {getStatusServiceGroup} from './api/Manager';
import Header from "./components/Header";
import StatusTable from "./components/StatusTable";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [groupStatus, setGroupStatus] = useState({});

  useEffect (() =>{
    getStatusServiceGroup().then(response => setGroupStatus(response));
  },[]);

  return (
    <div>
      <Header />
      <StatusTable CardHeaderTitle="Current Status by Service" />
    </div>
  );
}

export default App;
