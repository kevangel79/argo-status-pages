import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { getStatusServiceGroup, getResultServiceGroups } from "./api/Manager";
import Header from "./components/Header";
import StatusTable from "./components/StatusTable";
import CurrentStatus from "./components/CurrentStatus";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [groupStatus, setGroupStatus] = useState({});
  const [groupResults, setGroupResults] = useState({});

  useEffect(() => {
    getStatusServiceGroup().then((response) => setGroupStatus(response));
  }, []);

  useEffect(() => {
    getResultServiceGroups().then((response) => setGroupResults(response));
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div>
                <CurrentStatus groupStatus={groupStatus} />
                <StatusTable groupStatus={groupStatus} groupResults={groupResults} />
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
