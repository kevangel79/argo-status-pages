import config from "./config.json";
  EOSC_Core_Topology: {
    fullname: "EOSC Core Topology",
    category: "EOSC Core Topology",
  },
  "EOSC Core Topology": ["EOSC_Core_Topology"],

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
const THEME = config.theme;
const API = config.api;

export { SERVICES, STATUS, SERVICE_CATEGORIES, THEME, API };
