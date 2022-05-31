import React from "react";
import { useEffect, useState } from "react";
import { getDowntimes } from "../api/Manager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleCheck,
  faCalendar,
  faRecycle,
} from "@fortawesome/free-solid-svg-icons";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/App.module.css";

library.add(faCircleCheck, faCalendar, faRecycle);

const Downtime = (props) => {
  let status;
  let status_icon = "circle-check";
  let status_color = "#000";
  let now = new Date();
  let start = new Date(props.start_time);
  let end = new Date(props.end_time);

  if (now >= start && now < end) {
    status = "In progress";
    status_icon = "recycle";
    status_color = "#2980b9";
  } else if (now < start) {
    status = "Scheduled";
    status_icon = "calendar";
    status_color = "#95a5a6";
  } else if (now >= end) {
    status = "Completed";
    status_icon = "circle-check";
    status_color = "#27ae60";
  }

  return (
    <div className="card mb-4 mr-2 shadow-sm">
      <div className="card-header">
        <h3 className="my-0 font-weight-normal">{props.service}</h3>
      </div>
      <div className="card-body">
        <div className="mb-8">
          <h5>{props.hostname}</h5>
        </div>
        <div>
          <div className="mr-1">
            <FontAwesomeIcon
              icon={status_icon}
              color={status_color}
              size="lg"
            />
          </div>
          {status}
        </div>
        <ul className="list-unstyled mt-3 mb-4">
          <li key={props.service + "-start"}>
            <span>From: </span>
            {start.toLocaleString()}
          </li>
          <li key={props.service + "-end"}>
            <span>To: </span>
            {end.toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

const updateDowntimes = (date, setDowntimes, setStartDate) => {
  setStartDate(date);
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - (offset * 60 * 1000))
  getDowntimes(date.toISOString().split('T')[0]).then((response) => setDowntimes(response.data));
}

const Downtimes = (props) => {

  const [startDate, setStartDate] = useState(new Date());
  const [downtimes, setDowntimes] = useState({});

  useEffect(() => {
    getDowntimes(startDate.toISOString().split('T')[0]).then((response) => setDowntimes(response.data));
  }, []);

  let downtimesArray = <div>No downtimes are scheduled</div>;
  if (Array.isArray(downtimes) && downtimes[0].endpoints.length > 0) {
    downtimesArray = downtimes[0].endpoints.map((obj, i) => {
      return (
        <Downtime
          key={`downtime-${i}`}
          service={obj.service}
          hostname={obj.hostname}
          start_time={obj.start_time}
          end_time={obj.end_time}
        />
      );
    });
  }

  const renderDayContents = (day, date) => {
    const tooltipText = `${date}`;
    return <span title={tooltipText}>{date.getDate()}</span>;
  };

  return (
    <div>
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => updateDowntimes(date, setDowntimes, setStartDate)}
          renderDayContents={renderDayContents}
          showMonthPicker
          inline
          monthsShown={1}
          dayClassName={(date) =>
            "roundy"
          }
        />
      </div>
      <hr />
      <div className={`${styles["downtimes"]} ${styles["font_weight_regular"]} ${styles["tiny"]}`}>
        {downtimesArray}
      </div>
    </div>
  );
};

export default Downtimes;
