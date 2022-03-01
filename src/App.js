import { useEffect, useState } from 'react';
import {getStatusServiceGroup} from './api/Manager';
import Header from "./components/Header";
import StatusTable from "./components/StatusTable";
import CurrentStatus from "./components/CurrentStatus";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [groupStatus, setGroupStatus] = useState({});

  useEffect (() =>{
    getStatusServiceGroup().then(response => setGroupStatus(response));
  },[]);

  return (
    <div>
      <Header />
      <CurrentStatus groupStatus={groupStatus}/>
      <StatusTable groupStatus={groupStatus} />
    </div>
  );
}

export default App;
