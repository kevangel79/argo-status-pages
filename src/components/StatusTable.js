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
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

import { SERVICES, STATUS, SERVICE_CATEGORIES } from "../config";

import styles from "../styles/App.module.css";

library.add(
  faCircleCheck,
  faWrench,
  faFlag,
  faTriangleExclamation,
  faCircleMinus,
  faCircleQuestion,
  faCalendarAlt
);

const StatusTable = (props) => {

  const servicesTransform = (props) => {
    let services = [];
    if (props.groupStatus["groups"]) {
      props.groupStatus["groups"].forEach((item) => {
        if (item.name in SERVICES) {
          let service = {};
          let status = item["statuses"].slice(-1)[0]["value"];

          Object.assign(service, STATUS[status]);
          service["name"] = SERVICES[item.name].fullname;
          service["status"] = status;
          service["category"] = SERVICES[item.name].category;
          services.push(service);
        }
      });
      return services;
    }
    return services;
  };

  const downtimesTransform = (props) => {
    let downtimes = {};
    if (props.downtimes[0] !== undefined && props.downtimes[0].endpoints.length > 0) {
      props.downtimes[0].endpoints.forEach((item) => {
        if (!(item.service in downtimes)) {
          downtimes[item.service] = []
        }
        downtimes[item.service].push(item)
      });
      return downtimes;
    }
    return downtimes;
  };

  const servicesGroup = (services, downtimes) => {
    let divs = {};
    Object.keys(SERVICE_CATEGORIES).forEach((category, index) => {
      if (services) {
        services.forEach((service, index) => {
          if (service.category === category) {
            if (!(category in divs)) {
              divs[category] = [];
            }
            divs[category].push(
              <div
                className={`${styles["service"]} ${styles["header"]} ${styles["align"]} ${styles["align_center"]}`}
                key={`service-${index}`}
              >
                <div className={styles.flex_column}>
                  <span>{service.name}</span>
                  <span className={styles.tiny}>{service.text}</span>
                  {service.name in downtimes &&
                  <div>
                    <span>&#8203;</span>
                    <span className={styles.tiny}>Scheduled downtime at {downtimes[service.name][0].start_time}</span>
                  </div>
                  }
                </div>
                <div
                  className={`${styles["flex_row"]} ${styles["align_center"]}`}
                >
                  <FontAwesomeIcon
                    icon={service.icon}
                    color={service.color}
                    size="lg"
                  />
                </div>
              </div>
            );
          }
        });
      }
    });
    return divs;
  };

  let services = servicesTransform(props);
  let downtimes = downtimesTransform(props);
  let grouped_services = servicesGroup(services, downtimes);

  const legend = (
    <div
      className={`${styles["services_legend"]} ${styles["section"]} ${styles["justify_content_center"]}`}
    >
      <div className={`${styles["header"]}`}>
        <span className={`${styles["title"]} ${styles["tiny"]}`}>
          {/* Last updated: 2022-03-02T10:47:03Z */}
        </span>
        <div
          className={`${styles["legend"]} ${styles["flex_row"]} ${styles["align_center"]}`}
        >
          {Object.keys(STATUS).map((item, index) => {
            return (
              <div
                className={`${styles["flex_row"]} ${styles["align_center"]}`}
                key={`badge-${index}`}
              >
                <FontAwesomeIcon
                  icon={STATUS[item].icon}
                  color={STATUS[item].color}
                  size="xs"
                />
                <span
                  className={`${styles["tiny"]} ${styles["off_black"]} p-2`}
                >
                  {item}
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
        <div>
          {Object.keys(grouped_services).map((service, index) => {
            let result = {};
            if (props.groupResults.results) {
              for (const [, i] of props.groupResults.results.entries()) {
                if (i.name && i["name"].replace("_", " ") === service) {
                  result = i["results"][0];
                  break;
                }
              }
            }
            let availability = null;
            let reliability = null;
            if (result["availability"]) {
              availability = (
                <div>
                <span>Availability: </span>
                <span>{result["availability"]}</span>
                <span>%</span>
                </div>)
            }
            if (result["reliability"]) {
              reliability = (
                <div>
                <span>Reliability: </span>
                <span>{result["reliability"]}</span>
                <span>%</span>
                </div>)
            }
            return (
              <div className={styles.services} key={`group-service-${index}`}>
                <div
                  className={`${styles["service_category_container"]} ${styles["services_legend"]} ${styles["section"]} ${styles["justify_content_center"]}`}
                >
                  <div
                    className={`${styles["service_category_container"]} ${styles["header"]} ${styles["bold"]}`}
                  >
                    {service} 
                    <div className={`${styles["service_category_container"]} ${styles["font_weight_regular"]} ${styles["tiny"]}`}>
                      <span>{availability}</span>
                      <span>{reliability}</span>
                    </div>
                  </div>
                </div>
                {grouped_services[service]}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatusTable;
