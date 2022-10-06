import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { getStatusServiceGroup, getResultServiceGroups, getResultServices } from "./api/Manager";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StatusTable from "./components/StatusTable";
import Downtimes from "./components/Downtimes";
import Uptime from "./components/Uptime";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [groupStatus, setGroupStatus] = useState({});
  const [groupResults, setGroupResults] = useState({});
  const [servicesResults, setServicesResults] = useState({});

  useEffect(() => {
    getStatusServiceGroup().then((response) => setGroupStatus(response));
  }, []);

  useEffect(() => {
    getResultServiceGroups().then((response) => setGroupResults(response));
  }, []);

  useEffect(() => {
    getResultServices().then((response) => setServicesResults(response));
  }, []);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div>
                <StatusTable groupStatus={groupStatus} groupResults={groupResults} servicesResults={servicesResults} />
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
          <Route
            exact
            path="/uptime/:service"
            element={
              <div>
                <div className="container">
                  <div className="card-deck mb-3 text-center">
                    <Uptime servicesResults={servicesResults}/>
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
