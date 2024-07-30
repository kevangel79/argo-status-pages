import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleCheck,
  faWrench,
  faFlag,
  faTriangleExclamation,
  faCircleMinus,
  faCircleQuestion,
  faCalendarAlt,
  faInfoCircle,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  ResultServicesT,
  StatusStyle,
  StatusServiceGroupT,
  ResultServiceGroupsT,
  InternalCategoryT,
} from "../types";
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
  faArrowUpRightFromSquare,
);

type CustomServiceT = StatusStyle & {
  name: string;
  original_name: string;
  status: string;
  results: {
    uptime: number;
  };
  category: string;
};

type PropsT = {
  groupStatus: StatusServiceGroupT;
  groupResults: ResultServiceGroupsT;
  servicesResults: ResultServicesT;
};

const StatusTable = (props: PropsT) => {
  const navigate = useNavigate();

  const [flatServices, setFlatServices] = useState<InternalCategoryT[]>([]);
  useEffect(() => {
    const flattenConfigurationServices = () => {
      let fs: InternalCategoryT[] = [];
      CATEGORIES.forEach((category) => {
        fs = fs.concat(category.items);
      });
      setFlatServices(fs);
    };

    flattenConfigurationServices();
  }, []);

  const getCategoriesFromServiceName = (service: string) => {
    let r: any = {};
    for (let category of CATEGORIES) {
      r = category["items"].filter((x) => x.remote_name === service);
      if (r.length > 0) {
        return [category.remote_name, category.displayed_name];
      }
    }
    return [];
  };

  // this function searches the CATEGORIES based on a category remoteName 
  // and returns the category's displayed name if available (else just echoes back the remoteName)
  const getCategoryDisplayedName = (remoteName: string) => {
    for (let category of CATEGORIES) {
      if (category["remote_name"] === remoteName) {
        return category["displayed_name"]
      }
    }
    return remoteName
  }

  const servicesTransform = (props: PropsT): CustomServiceT[] => {
    let services: CustomServiceT[] = [];
    if (props.groupStatus["groups"]) {
      props.groupStatus["groups"].forEach((item: any) => {
        let s = flatServices.filter((x: any) => x.remote_name === item.name);
        let _s;
        if (s.length > 0) {
          _s = s[0];
          let service: any = {};
          let status = item["statuses"].slice(-1)[0]["value"];

          Object.assign(service, STATUS[status]);
          service["name"] = _s.displayed_name;
          service["original_name"] = item.name;
          service["status"] = status;
          if (props.servicesResults.results !== undefined) {
            props.servicesResults.results.forEach((result: any) => {
              result.endpoints.forEach((r: any) => {
                if (r.name === item.name) {
                  service["results"] = {
                    uptime: parseFloat(
                      parseFloat(
                        (r.results[0].uptime * 100).toString(),
                      ).toFixed(2),
                    ),
                  };
                }
              });
            });
          }
          service["category"] = getCategoriesFromServiceName(
            service["original_name"],
          )[0];
          services.push(service);
        }
      });
      return services;
    }
    return services;
  };

  const servicesGroup = (services: CustomServiceT[]) => {
    let divs: { [key: string]: Array<React.JSX.Element> } = {};
    CATEGORIES.forEach((category) => {
      if (services) {
        services.forEach((service: CustomServiceT, index: number) => {
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
                          <div
                            className={`${styles["uptime-inner-container"]}`}
                          >
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
                        <div
                          className={`${styles["tiny"]} ${styles["cursor"]}`}
                          onClick={() =>
                            navigate("/uptime/" + service.original_name)
                          }
                        >
                          <span>
                            <FontAwesomeIcon
                              icon="arrow-up-right-from-square"
                              color="gray"
                              size="sm"
                            />
                          </span>
                          <span>More history</span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div
                  className={`${styles["flex_row"]} ${styles["align_center"]}`}
                >
                  {service.icon !== null && service.icon !== undefined && (
                    <FontAwesomeIcon
                      icon={service.icon as IconProp}
                      color={service.color}
                      size="lg"
                    />
                  )}
                </div>
              </div>,
            );
          }
        });
      }
    });
    console.log(divs);
    return divs;
  };

  let services = servicesTransform(props);
  let grouped_services = servicesGroup(services);

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
                  icon={STATUS[item].icon as IconProp}
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
            let result: any = {};
            if (props.groupResults.results) {
              for (const i of props.groupResults.results) {
                if (
                  CATEGORIES.filter(
                    (x) => x.displayed_name === i["name"].replaceAll("_", " "),
                  ).length > 0
                ) {
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
                    <div>{getCategoryDisplayedName(service)}</div>
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
