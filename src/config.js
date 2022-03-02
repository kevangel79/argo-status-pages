const CONFIG = {
  primaryColor: "#ff",
  headerMenuTextColor: "#000",
  endpoint: "api.argo.grnet.gr",
  reportName: "CORE",
};

const SERVICES = {
  EOSC_Messaging_Service: {
    fullname: "EOSC Messaging System (BO)",
    category: "EOSC Monitoring",
  },
  EOSC_CORE_MONITORING: {
    fullname: "EOSC Monitoring for Core Services (BO)",
    category: "EOSC Monitoring",
  },
  EOSC_EXCHANGE_MONITORING: {
    fullname: "EOSC Monitoring for Exchange Services (BO)",
    category: "EOSC Monitoring",
  },
  EOSC_Service_Order_Management: {
    fullname: "EOSC Service Order Management Back-Office (BO)",
    category: "EOSC Order Management",
  },
};

const SERVICE_CATEGORIES = {
  "EOSC Monitoring": [
    "EOSC_Messaging_Service",
    "EOSC_CORE_MONITORING",
    "EOSC_EXCHANGE_MONITORING",
  ],
  "EOSC Order Management": ["EOSC_Service_Order_Management"],
};

const STATUS = {
  "OK": { icon: "circle-check", text: "OK", color: "#27ae60" },
  "DOWNTIME": { icon: "wrench", text: "Downtime", color: "#2980b9" },
  "MISSING": { icon: "flag", text: "Missing", color: "#8e44ad" },
  "WARNING": { icon: "triangle-exclamation", text: "Warning", color: "#f39c12" },
  "CRITICAL": { icon: "circle-minus", text: "Critical", color: "#c0392b" },
  "UNKNOWN": { icon: "circle-question", text: "Unknown", color: "#95a5a6" },
};

export { CONFIG, SERVICES, STATUS, SERVICE_CATEGORIES };
