import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleCheck,
  faWrench,
  faFlag,
  faTriangleExclamation,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";

import styles from "../styles/StatusTable.module.css";

library.add(
  faCircleCheck,
  faWrench,
  faFlag,
  faTriangleExclamation,
  faCircleMinus
);

const StatusTable = (props) => {
  
  const badges = [
    { icon: "circle-check", text: "No Issues", color: "#27ae60" },
    { icon: "wrench", text: "Maintenance", color: "#2980b9" },
    { icon: "flag", text: "Notice", color: "#8e44ad" },
    { icon: "triangle-exclamation", text: "Incident", color: "#f39c12" },
    { icon: "circle-minus", text: "Outage", color: "#c0392b" },
  ];

  const servicesTransform = (props) => {
    let services = [];
    if (props.groupStatus["groups"]) {
      props.groupStatus["groups"].map((item) => {
        let service = {};
        let status = item["statuses"].slice(-1)[0]["value"];

        switch (status) {
          case "OK":
            service["name"] = item.name.split('_').join(' ');
            service["status"] = status;
            service["icon"] = "circle-check";
            service["color"] = "#27ae60";
            services.push(service);
        }
      });
      return services;
    }
    return services;
  };

  // const services = [
  //   {
  //     name: "Service1",
  //     status: "No issues",
  //     description: "Description",
  //     icon: "circle-check",
  //     color: "#27ae60",
  //   },
  //   {
  //     name: "Service2",
  //     status: "No issues",
  //     description: "Description",
  //     icon: "wrench",
  //     text: "Maintenance",
  //     color: "#2980b9",
  //   },
  //   {
  //     name: "Service3",
  //     status: "No issues",
  //     description: "Description",
  //     icon: "flag",
  //     text: "Notice",
  //     color: "#8e44ad",
  //   },
  //   {
  //     name: "Service4",
  //     status: "No issues",
  //     description: "Description",
  //     icon: "triangle-exclamation",
  //     text: "Incident",
  //     color: "#f39c12",
  //   },
  //   {
  //     name: "Service5",
  //     status: "No issues",
  //     description: "Description",
  //     icon: "circle-minus",
  //     text: "Outage",
  //     color: "#c0392b",
  //   },
  // ];

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
                  size="lg"
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
