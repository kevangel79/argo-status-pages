import config from "./config.json";
import { StatusT, CategoryT, ApiT, ThemeT } from "./types";

enum Status {
  OK = "OK",
  DOWNTIME = "Downtime",
  MISSING = "Missing",
  WARNING = "Warning",
  CRITICAL = "Critical",
  UNKNOWN = "Unknown",
}

const STATUS: StatusT = {
  OK: { icon: "circle-check", text: Status["OK"], color: "#27ae60" },
  Downtime: { icon: "wrench", text: Status["DOWNTIME"], color: "#2980b9" },
  Missing: { icon: "flag", text: Status["MISSING"], color: "#8e44ad" },
  Warning: {
    icon: "triangle-exclamation",
    text: Status["WARNING"],
    color: "#f39c12",
  },
  Critical: {
    icon: "circle-minus",
    text: Status["CRITICAL"],
    color: "#c0392b",
  },
  Unknown: {
    icon: "circle-question",
    text: Status["UNKNOWN"],
    color: "#95a5a6",
  },
};

const CATEGORIES: CategoryT[] = config.categories;
const THEME: ThemeT = config.theme;
const API: ApiT = config.api;
const TITLE: string = config.title;
const COPYRIGHT: string = config.copyright;

export { CATEGORIES, STATUS, THEME, API, TITLE, COPYRIGHT };
