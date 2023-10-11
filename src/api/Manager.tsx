import { getCurrentDate, getDayBeforeCurrentDate } from "./Utils";
import { API } from "../config";
import {
  StatusServiceGroupT,
  ResultServiceGroupsT,
  ResultServicesT,
  DownTimeApiResponseT,
  ReportT,
} from "../types";

const headers: HeadersInit = {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_X_API_KEY || "X_API_KEY",
  Accept: "application/json",
};

const getStatusServiceGroup = async (): Promise<StatusServiceGroupT> => {
  // quickly construct request url
  let url =
    "https://" +
    API.endpoint +
    "/api/v2/status/" +
    API.reportName +
    "/" +
    API.groupType +
    "?start_time=" +
    getCurrentDate() +
    "T00:00:00Z" +
    "&end_time=" +
    getCurrentDate() +
    "T23:59:59Z";

  try {
    const response = await fetch(url, { headers: headers });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return data as StatusServiceGroupT;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

const getResultServices = async (): Promise<ResultServicesT> => {
  // quickly construct request url
  let url =
    "https://" +
    API.endpoint +
    "/api/v2/results/" +
    API.reportName +
    "/" +
    API.groupType +
    "?start_time=" +
    getCurrentDate() +
    "T00:00:00Z" +
    "&end_time=" +
    getCurrentDate() +
    "T23:59:59Z";

  try {
    const response = await fetch(url, { headers: headers });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return data as ResultServicesT;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

const getResultServicesRanged = async (
  daysnum: number,
): Promise<ResultServicesT> => {
  // quickly construct request url
  let url =
    "https://" +
    API.endpoint +
    "/api/v2/results/" +
    API.reportName +
    "/" +
    API.groupType +
    "?start_time=" +
    getDayBeforeCurrentDate(daysnum) +
    "T00:00:00Z" +
    "&end_time=" +
    getCurrentDate() +
    "T23:59:59Z";

  try {
    const response = await fetch(url, { headers: headers });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return data as ResultServicesT;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

const getResultServiceGroups = async (): Promise<ResultServiceGroupsT> => {
  // quickly construct request url
  let url =
    "https://" +
    API.endpoint +
    "/api/v2/results/" +
    API.reportName +
    "/" +
    API.supergroupType +
    "?start_time=" +
    getCurrentDate() +
    "T00:00:00Z" +
    "&end_time=" +
    getCurrentDate() +
    "T23:59:59Z";

  try {
    const response = await fetch(url, { headers: headers });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return data as ResultServiceGroupsT;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

const getDowntimes = async (date: string): Promise<DownTimeApiResponseT> => {
  // quickly construct request url
  let url = "https://" + API.endpoint + "/api/v2/downtimes" + "?date=" + date;
  try {
    const response = await fetch(url, { headers: headers });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return data as DownTimeApiResponseT;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

const getReports = async (): Promise<ReportT> => {
  // quickly construct request url
  let url = "https://" + API.endpoint + "/api/v2/reports";

  try {
    const response = await fetch(url, { headers: headers });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return data as ReportT;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export {
  getStatusServiceGroup,
  getResultServiceGroups,
  getResultServices,
  getDowntimes,
  getResultServicesRanged,
  getReports,
};
