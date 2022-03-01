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

const servicesTransform = (props) => {
  let services = [];
  let flag = false;
  if (props.groupStatus["groups"]) {
    props.groupStatus["groups"].map((item) => {
      let service = {};
      let status = item["statuses"].slice(-1)[0]["value"];

      switch (status) {
        case "OK":
          service["name"] = item.name.split("_").join(" ");
          service["status"] = status;
          service["icon"] = "circle-check";
          service["color"] = "#27ae60";
          services.push(service);
          break;
        default:
          flag = true;
      }
    });
    if (flag === false) {
      return { icon: "circle-check", color: "#27ae60" };
    } else return { icon: "circle-check", color: "#27ae60" };
  }
  return { icon: "circle-check", color: "#27ae60" };
};

const CurrentStatus = (props) => {
  let status = servicesTransform(props);
  return (
    <div
      id="current_status"
      className={`${styles["section"]} ${styles["align_center"]} ${styles["justify_content_center"]}`}
    >
      {props.groupStatus["groups"] && (
        <div className={`${styles["container"]}`}>
          <FontAwesomeIcon icon={status.icon} color={status.color} size={200} />

          <h1 className={`${styles["text_center"]} ${styles["width_100"]}`}>
            Slack is up and running
          </h1>
          <p
            className={`${styles["medium"]} ${styles["text_center"]} ${styles["off_gray"]} ${styles["width_100"]}`}
          >
            Having trouble?{" "}
            <a
              href="https://slack.com/help/articles/205138367-Troubleshoot-connection-issues"
              className={`${styles["underline"]}`}
            >
              Troubleshoot connection issues
            </a>{" "}
            or email us at{" "}
            <a
              href="mailto:feedback@slack.com"
              className={`${styles["underline"]}`}
            >
              feedback@slack.com
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrentStatus;
