import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReports, getResultServicesRanged } from "../api/Manager";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleCheck,
  faCalendar,
  faRecycle,
} from "@fortawesome/free-solid-svg-icons";

import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/App.module.css";
import { SERVICES, NGI_MAPPING, API } from "../config";

library.add(faCircleCheck, faCalendar, faRecycle);


const Uptime = (props) => {
  const { service } = useParams();

  const [servicesResults, setServicesResults] = useState({});
  useEffect(() => {
    getResultServicesRanged(90).then((response) => setServicesResults(response));
  }, []);

  const [thresholds, setThresholds] = useState({});
  useEffect(() => {
    getReports().then((response) => {
      if (response.data) {
        response.data.forEach((r) => {
          if (r.info.name === API.reportName) {
            setThresholds(r.thresholds)
          }
        });
      }
    });
  }, []);

  const filterServiceResults = () => {
    if (servicesResults !== undefined) {
      let category = NGI_MAPPING[SERVICES[service].category].replaceAll(" ", "_");
      if (servicesResults.results) {
        for (var i = 0; i < servicesResults["results"].length; i++) {
          let c = servicesResults["results"][i];
          if (c.name === category) {
            for (var j = 0; j < c["endpoints"].length; j++) {
              let s = c["endpoints"][j];
              if (s.name === service) {
                return s.results
              }
            }
          }
        }
      }
    }
  }

  const calculateAverageUptime = () => {
    let sum = 0;
    if (results !== undefined) {
      results.forEach((r) => {
        sum += parseFloat(r.uptime);
      });
      return ((sum / results.length) * 100).toFixed(2);
    }
    return "";
  }

  let results = filterServiceResults();

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const handleMouseMove = event => {
    setCoords({
      x: event.nativeEvent.layerX,
      y: event.clientY - event.target.offsetTop,
    });
  };


  let days = [];
  let marginx = 0;
  const [hovering, setHovering] = useState(false);
  const [result, setResult] = useState({});

  const mouseOver = (r) => {
    setHovering(true);
    setResult(r);
  }
  const mouseOut = () => setHovering(false)

  if (results !== undefined) {
    let fill = "#16a085";
    for (var i = 0; i < results.length; i++) {
      if (parseInt(results[i].unknown) === 1) {
        fill = "##8e44ad";
      }
      else if (
        parseFloat(results[i].uptime) ||
        parseFloat(results[i].availability) ||
        parseFloat(results[i].reliability) 
      ) {
        if (
          (parseFloat(thresholds.uptime) + 0.01 < 1 && parseFloat(results[i].uptime) <= parseFloat(thresholds.uptime) + 0.01) ||
          (parseFloat(thresholds.availability) + 2 < 100 && parseFloat(results[i].availability) <= parseFloat(thresholds.availability) + 2) ||
          (parseFloat(thresholds.reliability) + 2 < 100 && parseFloat(results[i].reliability) <= parseFloat(thresholds.reliability) + 2)
        )
        fill = "#e67e22";
        else {
          fill = "#16a085";
        }
      }
      else if (
        parseFloat(results[i].uptime) <= thresholds.uptime ||
        parseFloat(results[i].availability) <= thresholds.availability ||
        parseFloat(results[i].reliability) <= thresholds.reliability
      ) {
        fill = "#e74c3c";
      }
      else {
        fill = "#16a085";
      }
      days.push(<rect key={`day-${i}`} onMouseOver={mouseOver.bind(this, results[i])}
        onMouseOut={mouseOut} height="34" width="2" x={`${marginx}`} y="0" fill={fill} className={`uptime-day component-0mw0pdgvs1l3 day-${i}`} data-html="true"></rect>);
      marginx += 3;
    }
  }

  const tooltip = (
    <div>
      <div className={`${styles["pointer-container"]}`} style={{ top: 100, left: coords.x - 8 }}>
        <div className={`${styles["pointer-larger"]}`}></div>
        <div className={`${styles["pointer-smaller"]}`}></div>
      </div>
      <div className={`${styles["tooltip-box"]}`} style={{ top: 110, left: coords.x - 162 }}>
        <div className={`${styles["tooltip-content"]}`}>
          <div className={`${styles["tooltip-close"]} ${styles["hidden"]}`}>
            <i className="fa fa-times"></i>
          </div>
          <div className={`${styles["date"]}`}>{result.timestamp}</div>
          <div>
            <ul>
              <li >
                <span>Uptime: {parseFloat(result.uptime * 100).toFixed(2)} %</span>
              </li>
              <li><span>Availability: {parseFloat(result.availability).toFixed(2)} %</span></li>
              <li><span>Reliability: {parseFloat(result.reliability).toFixed(2)} %</span></li>
              <li><span>Downtime: {result.downtime}</span></li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="card mb-4 mr-2 shadow-sm">
      <div className="card-header">
        <h6 className="my-0 font-weight-normal">{service.replaceAll("_", " ")}</h6>
      </div>
      <div className="card-body">
        <div className="mb-8">
          <h5>{props.hostname}</h5>
        </div>
        <div className={`${styles["uptime-90-days-wrapper"]}`}>
          <svg id="uptime-component-0mw0pdgvs1l3" preserveAspectRatio="none" height="34" viewBox={"-120 0 500 34"} onMouseMove={handleMouseMove}>
            {days}
          </svg>
          <div className={`${styles["legend"]}`}>
            <div className={`${styles["legend-item"]} ${styles["light"]} ${styles["legend-item-date-range"]}`}>
              <span className={`${styles["availability-time-line-legend-day-count"]}`}>{results && results.length}</span> days ago
            </div>
            <div className={`${styles["spacer"]}`}></div>
            <div className={`${styles["legend-item"]} ${styles["legend-item-uptime-value"]}`}>
              <span id="uptime-percent-0mw0pdgvs1l3">
                <var data-var="uptime-percent">{calculateAverageUptime()}</var>
              </span>
              % uptime
            </div>
            <div className={`${styles["spacer"]}`}></div>
            <div className={`${styles["legend-item"]} ${styles["light"]} ${styles["legend-item-date-range"]}`}>Today</div>
          </div>
          {hovering ?
            tooltip : null}
        </div>
      </div>
    </div>
  );
};


export default Uptime;
