import config from "./config.json";

const STATUS = {
  OK: { icon: "circle-check", text: "OK", color: "#27ae60" },
  DOWNTIME: { icon: "wrench", text: "Downtime", color: "#2980b9" },
  MISSING: { icon: "flag", text: "Missing", color: "#8e44ad" },
  WARNING: { icon: "triangle-exclamation", text: "Warning", color: "#f39c12" },
  CRITICAL: { icon: "circle-minus", text: "Critical", color: "#c0392b" },
  UNKNOWN: { icon: "circle-question", text: "Unknown", color: "#95a5a6" },
};

const SERVICES = config.services;
const SERVICE_CATEGORIES = config.service_categories;
const NGI_MAPPING = config.ngi_categories;
const THEME = config.theme;
const API = config.api;
const TITLE = config.title;
const COPYRIGHT = config.copyright;

export {
  SERVICES,
  STATUS,
  SERVICE_CATEGORIES,
  NGI_MAPPING,
  THEME,
  API,
  TITLE,
  COPYRIGHT,
};
