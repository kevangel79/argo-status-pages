import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
  faArrowUpRightFromSquare
} from "@fortawesome/free-solid-svg-icons";

import { CATEGORIES, STATUS } from "../config";

import styles from "../styles/App.module.css";

library.add(
  faCircleCheck,
  faWrench,
  faFlag,
  faTriangleExclamation,
  faCircleMinus,
  faCircleQuestion,
  faCalendarAlt,
  faInfoCircle,
  faArrowUpRightFromSquare
);

const StatusTable = (props) => {
  const navigate = useNavigate();

  const [flatServices, setFlatServices] = useState([]);
  useEffect(() => {
    const flattenConfigurationServices = () => {
      let fs = [];
      CATEGORIES.forEach((category) => {
        fs = fs.concat(category.items);
      });
      setFlatServices(fs);
    };

    flattenConfigurationServices();
  }, []);

  const getCategoriesFromServiceName = (service) => {
    let r = {};
    for (let category of CATEGORIES) {
      r = category["items"].filter(x => x.remote_name === service);
      if (r.length > 0) {
        return [category.remote_name, category.displayed_name];
      }
    };
    return [];
  }

  const servicesTransform = (props) => {
    let services = [];
    if (props.groupStatus["groups"]) {
      props.groupStatus["groups"].forEach((item) => {
        let s = flatServices.filter(x => x.remote_name === item.name);
        let _s;
        if (s.length > 0) {
          _s = s[0]
          let service = {};
          let status = item["statuses"].slice(-1)[0]["value"];

          Object.assign(service, STATUS[status]);
          service["name"] = _s.displayed_name;
          service["original_name"] = item.name;
          service["status"] = status;
          if (props.servicesResults.results !== undefined) {
            props.servicesResults.results.forEach((result, index) => {
              result.endpoints.forEach((r, index) => {
                if (r.name === item.name) {
                  service["results"] = {
                    uptime: parseFloat(
                      parseFloat(r.results[0].uptime * 100).toFixed(2)
                    ),
                  };
                }
              });
            });
          }
          service["category"] = getCategoriesFromServiceName(service["original_name"])[0];
          services.push(service);
        }
      });
      return services;
    }
    return services;
  };

  const servicesGroup = (props, services) => {
    let divs = {};
    CATEGORIES.forEach((category, index) => {
      if (services) {
        services.forEach((service, index) => {
          if (service.category === category.remote_name) {
            if (!(category.remote_name in divs)) {
              divs[category.remote_name] = [];
            }
            divs[category.remote_name].push(
              <div
                className={`${styles["service"]} ${styles["header"]} ${styles["align"]} ${styles["align_center"]}`}
                key={`service-${index}`}
              >
                <div className={styles.flex_column}>
                  <span className={styles.service_name}>{service.name}</span>
                  <div>
                    {service.results ? (
                      <div className={`${styles["uptime-container"]}`}>
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
                          <div className={`${styles["uptime-inner-container"]}`}>
                            <span>
                              <FontAwesomeIcon
                                icon="info-circle"
                                color="gray"
                                size="xs"
                              />
                            </span>
                            <span className={styles.tiny}>Daily uptime:</span>

                            <span className={styles.tiny}>
                              {service.results.uptime}%
                            </span>
                          </div>
                        </OverlayTrigger>
                        <div className={`${styles["tiny"]} ${styles["cursor"]}`} onClick={() =>
                          navigate(
                            "/uptime/" + service.original_name
                          )
                        }>
                          <span>
                            <FontAwesomeIcon
                              icon="arrow-up-right-from-square"
                              color="gray"
                              size="sm"
                            />
                          </span>
                          <span>
                            More history
                          </span>
                        </div>
                      </div>
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
                if (CATEGORIES.filter(x => x.displayed_name === i["name"].replaceAll("_", " ")).length > 0) {
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
