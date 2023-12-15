import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  StatusServiceGroupT,
  ResultServiceGroupsT,
  ResultServicesT,
} from "./types";

import {
  getStatusServiceGroup,
  getResultServiceGroups,
  getResultServices,
} from "./api/Manager";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StatusTable from "./components/StatusTable";
import Downtimes from "./components/Downtimes";
import Uptime from "./components/Uptime";
import About from "./components/About";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [groupStatus, setGroupStatus] = useState<StatusServiceGroupT>();
  const [groupResults, setGroupResults] = useState<ResultServiceGroupsT>();
  const [servicesResults, setServicesResults] = useState<ResultServicesT>();

  useEffect(() => {
    getStatusServiceGroup().then((response: StatusServiceGroupT) =>
      setGroupStatus(response),
    );
  }, []);

  useEffect(() => {
    getResultServiceGroups().then((response: ResultServiceGroupsT) =>
      setGroupResults(response),
    );
  }, []);

  useEffect(() => {
    getResultServices().then((response: ResultServicesT) =>
      setServicesResults(response),
    );
  }, []);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {groupStatus !== undefined &&
                  groupResults !== undefined &&
                  servicesResults !== undefined && (
                    <StatusTable
                      groupStatus={groupStatus}
                      groupResults={groupResults}
                      servicesResults={servicesResults}
                    />
                  )}
              </div>
            }
          />
          <Route
            path="/about"
            element={<About />}
          >
          </Route>
          <Route
            path="/downtimes"
            element={
              <div>
                <div className="container">
                  <div className="card-deck mb-3 text-center">
                    <Downtimes />
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="/uptime/:service"
            element={
              <div>
                <div className="container-lg">
                  <div className="card-deck mb-3 text-center">
                    {servicesResults !== undefined && (
                      <Uptime servicesResults={servicesResults} />
                    )}
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
