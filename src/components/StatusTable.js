import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleCheck,
  faWrench,
  faFlag,
  faTriangleExclamation,
  faCircleMinus,
  faCircleQuestion
} from "@fortawesome/free-solid-svg-icons";

import styles from "../styles/App.module.css";

library.add(
  faCircleCheck,
  faWrench,
  faFlag,
  faTriangleExclamation,
  faCircleMinus,
  faCircleQuestion
);

const StatusTable = (props) => {
  
  const badges = [
    { icon: "circle-check", text: "OK", color: "#27ae60" },
    { icon: "wrench", text: "Downtime", color: "#2980b9" },
    { icon: "flag", text: "Missing", color: "#8e44ad" },
    { icon: "triangle-exclamation", text: "Warning", color: "#f39c12" },
    { icon: "circle-minus", text: "Critical", color: "#c0392b" },
    { icon: "circle-question", text: "Unknown", color: "#95a5a6" },
  ];

  const servicesTransform = (props) => {
    let services = [];
    if (props.groupStatus["groups"]) {
      props.groupStatus["groups"].forEach((item) => {
        let service = {};
        let status = item["statuses"].slice(-1)[0]["value"];

        switch (status) {
          case "OK":
            service["name"] = item.name.split('_').join(' ');
            service["status"] = status;
            service["icon"] = "circle-check";
            service["color"] = "#27ae60";
            services.push(service);
            break;
          default:
            break;
        }
      });
      return services;
    }
    return services;
  };

  let services = servicesTransform(props);

  const legend = (
    <div
      className={`${styles["services_legend"]} ${styles["section"]} ${styles["justify_content_center"]}`}
    >
      <div className={`${styles["header"]}`}>
        <span className={`${styles["title"]} ${styles["bold"]}`}>
          Current Status by Service
        </span>
        <div
          className={`${styles["legend"]} ${styles["flex_row"]} ${styles["align_center"]}`}
        >
          {badges.map((item, index) => {
            return (
              <div
                className={`${styles["flex_row"]} ${styles["align_center"]}`}
                key={`badge-${index}`}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  color={item.color}
                  size="xs"
                />
                <span className={`${styles["tiny"]} ${styles["off_black"]} p-2`}>
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div>{legend}</div>
      <div className={styles.section}>
        <div className={styles.services}>
          {services && services.map((item, index) => {
            return (
              <div
                className={`${styles["service"]} ${styles["header"]} ${styles["align"]} ${styles["align_center"]}`}
                key={`service-${index}`}
              >
                <div className={styles.flex_column}>
                  <span className={styles.bold}>{item.name}</span>
                  <span className={styles.tiny}>{item.status}</span>
                </div>
                <div
                  className={`${styles["flex_row"]} ${styles["align_center"]}`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    color={item.color}
                    size="lg"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatusTable;
