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
import { API } from "../config";

library.add(faCircleCheck, faCalendar, faRecycle);

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

const Uptime = (props: any) => {
  const { service } = useParams();

  const [windowSize, setWindowSize] = useState(getWindowSize());

  const [servicesResults, setServicesResults] = useState<ResultServicesT>();
  useEffect(() => {
    getResultServicesRanged(90).then((response: ResultServicesT) => setServicesResults(response));
  }, []);

  const [thresholds, setThresholds] = useState<any>({});
  useEffect(() => {
    getReports().then((response: ReportT) => {
      if (response.data) {
        response.data.forEach((r: any) => {
          if (r.info.name === API.reportName) {
            setThresholds(r.thresholds)
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const filterServiceResults = () => {
    if (servicesResults !== undefined) {
      if (servicesResults.results) {
        for (var i = 0; i < servicesResults["results"].length; i++) {
          let c = servicesResults["results"][i];
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

  const calculateAverageUptime = (results: any) => {
    let sum = 0;
    if (results !== undefined && results.length > 0) {
      results.forEach((r: any) => {
        sum += parseFloat(r.uptime);
      });
      return ((sum / results.length) * 100).toFixed(2);
    }
    return "";
  }

  let results = filterServiceResults();

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const handleMouseMove = (event: any) => {
    setCoords({
      x: event.nativeEvent.layerX,
      y: event.clientY - event.target.offsetTop,
    });
  };


  let days: React.JSX.Element[] = [];
  let days30: React.JSX.Element[] = [];
  let fill = "#16a085";
  const [hovering, setHovering] = useState(false);
  const [result, setResult] = useState<any>({});

  const mouseOver = (r: any) => {
    setHovering(true);
    setResult(r);
  }
  const mouseOut = () => {
    setHovering(false);
  }

  const prepareDays = (vec: React.JSX.Element[], num: number) => {
    let marginx = 0;
    if (results && results.length > 0) {
      let startidx = 0;
      if (results.length - num < 0) {
        startidx = 0;
      }
      else {
        startidx = results.length - num;
      }
      for (var i = startidx; i < results.length; i++) {

        if (results[i].unknown === 1) {
          fill = "##8e44ad";
        }
        else if (
          results[i].uptime ||
          results[i].availability ||
          results[i].reliability
        ) {
          if (
            (parseFloat(thresholds.uptime) + 0.01 < 1 && results[i].uptime <= thresholds.uptime + 0.01) ||
            (parseFloat(thresholds.availability) + 2 < 100 && results[i].availability <= thresholds.availability + 2) ||
            (parseFloat(thresholds.reliability) + 2 < 100 && results[i].reliability <= thresholds.reliability + 2)
          )
            fill = "#e67e22";
          else {
            fill = "#16a085";
          }
        }
        else if (
          results[i].uptime <= thresholds.uptime ||
          results[i].availability <= thresholds.availability ||
          results[i].reliability <= thresholds.reliability
        ) {
          fill = "#e74c3c";
        }
        else {
          fill = "#16a085";
        }
        vec.push(<rect key={`day-${i}`} onMouseOver={mouseOver.bind(this, results[i])} onMouseOut={mouseOut}
          height="34" width="5" x={`${marginx}`} y="0" fill={fill} className={`uptime-day component-0mw0pdgvs1l3 day day-${i}`} data-html="true"></rect>);
        vec.push(<rect key={`mday-${i}`} onMouseOver={mouseOver.bind(this, results[i])}
          height="34" width="3" x={`${marginx + 5}`} y="0" fill="#fff" data-html="true"></rect>);
        marginx += 8;
      }
    }
  }

  if (results !== undefined && results.length > 0) {
    prepareDays(days, 90);
    prepareDays(days30, 50);
  }

  const tooltip = (
    <div>
      <div className={`${styles["pointer-container"]}`} style={{ top: 100, left: coords.x - 8 }}>
        <div className={`${styles["pointer-larger"]}`}></div>
        <div className={`${styles["pointer-smaller"]}`}></div>
      </div>
      <div className={`${styles["tooltip-box"]}`} style={{ top: 110, left: coords.x - 160 }}>
        <div className={`${styles["tooltip-content"]}`}>
          <div className={`${styles["tooltip-close"]} ${styles["hidden"]}`}>
            <i className="fa fa-times"></i>
          </div>
          <div className={`${styles["date"]}`}>{result.timestamp}</div>
          <div style={{ "textAlign": "initial", marginTop: "0.5rem" }}>
            <ul>
              <li >
                <span>Uptime: {parseFloat((result.uptime * 100).toString()).toFixed(2)} %</span>
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
        {service !== undefined &&
          <h6 className="my-0 font-weight-normal">{service.replaceAll("_", " ")}</h6>
        }
      </div>
      <div className="card-body">
        <div className="mb-8">
          <h5>{props.hostname}</h5>
        </div>
        <div className={`${styles["uptime-90-days-wrapper"]}`}>
          {windowSize.innerWidth > 800 ?
            <svg id="uptime-component-0mw0pdgvs1l3" preserveAspectRatio="none" height="34" viewBox={"0 0 720 34"} onMouseMove={handleMouseMove}>
              {days}
            </svg>
            :
            <svg id="uptime-component-0mw0pdgvs1l3" preserveAspectRatio="none" height="34" viewBox={"0 0 400 34"} onMouseMove={handleMouseMove}>
              {days30}
            </svg>
          }
          <div className={`${styles["legend"]}`}>
            <div className={`${styles["legend-item"]} ${styles["light"]} ${styles["legend-item-date-range"]}`}>
              {windowSize.innerWidth > 800 ?
                <div><span className={`${styles["availability-time-line-legend-day-count"]}`}>{results && results.length}</span> days ago</div>
                :
                <div><span className={`${styles["availability-time-line-legend-day-count"]}`}>50</span> days ago</div>
              }
            </div>
            <div className={`${styles["spacer"]}`}></div>
            <div className={`${styles["legend-item"]} ${styles["legend-item-uptime-value"]}`}>
              <span id="uptime-percent-0mw0pdgvs1l3">
                {windowSize.innerWidth > 800 ?
                  <var data-var="uptime-percent">{calculateAverageUptime(results)}</var>
                  :
                  <var data-var="uptime-percent">{calculateAverageUptime(results && results.slice(-50))}</var>
                }
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
