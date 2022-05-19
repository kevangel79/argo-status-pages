import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { getStatusServiceGroup, getResultServiceGroups, getDowntimes } from "./api/Manager";
import Header from "./components/Header";
import StatusTable from "./components/StatusTable";
import CurrentStatus from "./components/CurrentStatus";
import Downtimes from "./components/Downtimes";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [groupStatus, setGroupStatus] = useState({});
  const [groupResults, setGroupResults] = useState({});
  const [downtimes, setDowntimes] = useState({});

  useEffect(() => {
    getStatusServiceGroup().then((response) => setGroupStatus(response));
  }, []);

  useEffect(() => {
    getResultServiceGroups().then((response) => setGroupResults(response));
  }, []);

  useEffect(() => {
    getDowntimes(new Date().toISOString().split('T')[0]).then((response) => setDowntimes(response.data));
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
                <StatusTable groupStatus={groupStatus} groupResults={groupResults} downtimes={downtimes} />
              </div>
            }
          />
          <Route
            exact
            path="/downtimes"
            element={
              <div>
                <div className="container">
                  <div className="card-deck mb-3 text-center">
                    <Downtimes/>
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
