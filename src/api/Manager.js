import {doGet, getCurrentDate} from './Utils';
import {CONFIG} from '../config';
const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": process.env.REACT_APP_X_API_KEY
};

const getStatusServiceGroup = () => {
      // quickly construct request url
      let url =
        "https://" +
        CONFIG.endpoint +
        "/api/v2/status/" +
        CONFIG.reportName +
        "/SITES" +
        "?start_time="+getCurrentDate() + "T00:00:00Z"+
        "&end_time="+getCurrentDate() + "T23:59:59Z"

      return doGet(url, headers);
}

const getResultServiceGroups = () => {
  // quickly construct request url
  let url =
    "https://" +
    CONFIG.endpoint +
    "/api/v2/results/" +
    CONFIG.reportName +
    "/NGI" +
    "?start_time="+getCurrentDate() + "T00:00:00Z"+
    "&end_time="+getCurrentDate() + "T23:59:59Z"

  return doGet(url, headers);
}
  
export {getStatusServiceGroup, getResultServiceGroups};
