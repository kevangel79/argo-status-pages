import { doGet, getCurrentDate } from "./Utils";
import { API } from "../config";

const headers = {
  "Content-Type": "application/json",
  "x-api-key": process.env.REACT_APP_X_API_KEY,
  Accept: "application/json",
};

const getStatusServiceGroup = () => {
  // quickly construct request url
  let url =
    "https://" +
    API.endpoint +
    "/api/v2/status/" +
    API.reportName +
    "/" + API.groupType +
    "?start_time=" +
    getCurrentDate() +
    "T00:00:00Z" +
    "&end_time=" +
    getCurrentDate() +
    "T23:59:59Z";

  return doGet(url, headers);
};

const getResultServices = () => {
  // quickly construct request url
  let url =
    "https://" +
    API.endpoint +
    "/api/v2/results/" +
    API.reportName +
    "/" + API.groupType +
    "?start_time=" +
    getCurrentDate() +
    "T00:00:00Z" +
    "&end_time=" +
    getCurrentDate() +
    "T23:59:59Z";

  return doGet(url, headers);
};

const getResultServiceGroups = () => {
  // quickly construct request url
  let url =
    "https://" +
    API.endpoint +
    "/api/v2/results/" +
    API.reportName +
    "/NGI" +
    "?start_time=" +
    getCurrentDate() +
    "T00:00:00Z" +
    "&end_time=" +
    getCurrentDate() +
    "T23:59:59Z";

  return doGet(url, headers);
};

const getDowntimes = (date) => {
  // quickly construct request url
  let url =
    "https://" +
    API.endpoint +
    "/api/v2/downtimes" +
    "?date="+date;

  return doGet(url, headers);
}
  
export {getStatusServiceGroup, getResultServiceGroups, getResultServices, getDowntimes};
