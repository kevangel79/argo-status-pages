import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleCheck,
  faWrench,
  faFlag,
  faTriangleExclamation,
  faCircleMinus,
  faCircleQuestion,
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

const servicesTransform = (props) => {
  let services = [];
  let flag = false;
  if (props.groupStatus["groups"]) {
    props.groupStatus["groups"].forEach((item) => {
      let service = {};
      let status = item["statuses"].slice(-1)[0]["value"];

      if (status === "OK") {
        service["name"] = item.name.split("_").join(" ");
        service["status"] = status;
        service["icon"] = "circle-check";
        service["color"] = "#27ae60";
        services.push(service);
      } else {
        flag = true;
      }
    });
    if (flag === false) {
      return { icon: "circle-check", color: "#27ae60", status: "No issues" };
    } else
      return {
        icon: "triangle-exclamation",
        color: "#f39c12",
        status: "Incidents",
      };
  }
  return {
    icon: "triangle-exclamation",
    color: "#f39c12",
    status: "Incidents",
  };
};

const CurrentStatus = (props) => {
  let status = servicesTransform(props);
  return (
    <div
      id="current_status"
      className={`${styles["section"]} ${styles["align_center"]} ${styles["justify_content_center"]}`}
    >
      {props.groupStatus["groups"] && (
        <div className={`${styles["container"]} mb-5`}>
          <FontAwesomeIcon
            icon={status.icon}
            color={status.color}
            className={`${styles["svg-big"]}`}
          />

          <h1 className={`${styles["text_center"]} ${styles["width_100"]}`}>
            {status.status}
          </h1>
          <p
            className={`${styles["medium"]} ${styles["text_center"]} ${styles["off_gray"]} ${styles["width_100"]}`}
          >
            Having trouble?{" "}
            <a href="/" className={`${styles["underline"]}`}>
              Troubleshoot connection issues
            </a>{" "}
            or email us at{" "}
            <a href="/" className={`${styles["underline"]}`}>
              test@test.com
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrentStatus;
