import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { getStatusServiceGroup } from "./api/Manager";
import Header from "./components/Header";
import StatusTable from "./components/StatusTable";
import CurrentStatus from "./components/CurrentStatus";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [groupStatus, setGroupStatus] = useState({});

  useEffect(() => {
    getStatusServiceGroup().then((response) => setGroupStatus(response));
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
                <StatusTable groupStatus={groupStatus} />
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
