import * as React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
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
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import { SERVICES, STATUS, SERVICE_CATEGORIES, NGI_MAPPING } from "../config";

import styles from "../styles/App.module.css";

library.add(
  faCircleCheck,
  faWrench,
  faFlag,
  faTriangleExclamation,
  faCircleMinus,
  faCircleQuestion,
  faCalendarAlt,
  faInfoCircle
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
          if (props.servicesResults.results !== undefined) {
            props.servicesResults.results.forEach((result, index) => {
              result.endpoints.forEach((s, index) => {
                if (s.name === item.name) {
                  service["results"] = {
                    uptime: parseFloat(
                      parseFloat(s.results[0].uptime * 100).toFixed(2)
                    ),
                  };
                }
              });
            });
          }
          service["category"] = SERVICES[item.name].category;
          services.push(service);
        }
      });
      return services;
    }
    return services;
  };

  const servicesGroup = (props, services) => {
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
                  <span className={styles.service_name}>{service.name}</span>
                  <div>
                    {service.results ? (
                      <OverlayTrigger
                        key="uptime-tooltip"
                        placement="top"
                        overlay={
                          <Tooltip id={`uptime-tooltip-top`}>
                            <strong>Service Uptime</strong> is a performance
                            metric used to determine the amount of time a
                            service is operational
                          </Tooltip>
                        }
                      >
                        <div>
                          <FontAwesomeIcon
                            icon="info-circle"
                            color="gray"
                            size="xs"
                          />
                          <span className={styles.tiny}>&nbsp;Uptime: </span>

                          <span className={styles.tiny}>
                            {service.results.uptime} %
                          </span>
                        </div>
                      </OverlayTrigger>
                    ) : null}
                  </div>
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
  let grouped_services = servicesGroup(props, services);

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
    <div className="mb-5">
      <div>{legend}</div>
      <div className={styles.section}>
        <div>
          {Object.keys(grouped_services).map((service, index) => {
            let result = {};
            if (props.groupResults.results) {
              for (const [, i] of props.groupResults.results.entries()) {
                if (i["name"].replaceAll("_", " ") === NGI_MAPPING[service]) {
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
                  <FontAwesomeIcon icon="info-circle" color="gray" size="xs" />
                  <span>&nbsp;Availability: </span>
                  <span>
                    {parseFloat(parseFloat(result["availability"]).toFixed(2))}
                  </span>
                  <span>%</span>
                </div>
              );
            }
            if (result["reliability"]) {
              reliability = (
                <div>
                  <FontAwesomeIcon icon="info-circle" color="gray" size="xs" />
                  <span>&nbsp;Reliability: </span>
                  <span>
                    {parseFloat(parseFloat(result["reliability"]).toFixed(2))}
                  </span>
                  <span>%</span>
                </div>
              );
            }
            return (
              <div className={styles.services} key={`group-service-${index}`}>
                <div
                  className={`${styles["service_category_container"]} ${styles["services_legend"]} ${styles["section"]} ${styles["justify_content_center"]}`}
                >
                  <div
                    className={`${styles["service_category_container"]} ${styles["header"]} ${styles["bold"]} ${styles["service_name"]}`}
                  >
                    <div>{service}</div>
                    <div
                      className={`${styles["service_category_container"]} ${styles["font_weight_regular"]} ${styles["tiny"]}`}
                    >
                      {availability ? (
                        <OverlayTrigger
                          key="availability-tooltip"
                          placement="top"
                          overlay={
                            <Tooltip id={`availability-tooltip-top`}>
                              <strong>Service Availability</strong> is the
                              fraction of time a service was in the UP Period
                              during the known interval in a given period.
                            </Tooltip>
                          }
                        >
                          {availability}
                        </OverlayTrigger>
                      ) : null}
                      {reliability ? (
                        <OverlayTrigger
                          key="reliability-tooltip"
                          placement="top"
                          overlay={
                            <Tooltip id={`reliability-tooltip-top`}>
                              <strong>Service reliability</strong> is the ratio
                              of the time interval a service was UP over the
                              time interval it was supposed (scheduled) to be UP
                              in the given period.
                            </Tooltip>
                          }
                        >
                          {reliability}
                        </OverlayTrigger>
                      ) : null}
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
