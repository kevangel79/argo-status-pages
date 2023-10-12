import { useEffect, useState, useRef, useCallback } from "react";
import { getDowntimes } from "../api/Manager";
import { FaCalendar, FaCheckCircle, FaRecycle } from "react-icons/fa";

import DatePicker from "react-datepicker";

import { DowntimeT, DownTimeApiResponseT } from "../types";

import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/App.module.css";

const Downtime = (props: DowntimeT) => {
  let status = useRef<string>("");
  let now = new Date();
  let start = new Date(props.start_time);
  let end = new Date(props.end_time);

  const iconRender = useCallback(() => {
    if (now >= start && now < end) {
      status.current = "In progress";
      return <FaRecycle color="#2980b9" size="lg" />;
    } else if (now < start) {
      status.current = "Scheduled";
      return <FaCalendar color="#95a5a6" size="lg" />;
    } else if (now >= end) {
      status.current = "Completed";
      return <FaCheckCircle color="#27ae60" size="lg" />;
    }
  }, []);

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
          <div className="mr-1">{iconRender()}</div>
          {status.current}
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

const updateDowntimes = (
  date: Date | null,
  setDowntimes: Function,
  setStartDate: Function,
) => {
  if (date !== null) {
    setStartDate(date);
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    getDowntimes(date.toISOString().split("T")[0]).then(
      (response: DownTimeApiResponseT) => {
        setDowntimes(response.data);
      },
    );
  }
};

const Downtimes = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [downtimes, setDowntimes] = useState({});

  useEffect(() => {
    getDowntimes(startDate.toISOString().split("T")[0]).then(
      (response: DownTimeApiResponseT) => {
        setDowntimes(response.data);
      },
    );
  }, [startDate]);

  let downtimesArray = <div>No downtimes are scheduled</div>;
  if (Array.isArray(downtimes) && downtimes[0].endpoints.length > 0) {
    downtimesArray = downtimes[0].endpoints.map((obj: any, i: number) => {
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

  const renderDayContents = (dayOfMonth: number, date: Date) => {
    dayOfMonth = 0;
    const tooltipText = `${date}`;
    return (
      <span title={tooltipText}>
        {date.getDate() + dayOfMonth === 0 ? "" : ""}
      </span>
    );
  };

  return (
    <div>
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => updateDowntimes(date, setDowntimes, setStartDate)}
          renderDayContents={renderDayContents}
          inline
          monthsShown={1}
          dayClassName={() => "roundy"}
        />
      </div>
      <hr />
      <div
        className={`${styles["downtimes"]} ${styles["font_weight_regular"]} ${styles["tiny"]}`}
      >
        {downtimesArray}
      </div>
    </div>
  );
};

export default Downtimes;
