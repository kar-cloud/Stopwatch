import React from "react";

function Lap(props) {
  return (
    <div className="container">
      <div className="row lapRow">
        <div className="col">
          <h2 className="lapHeader">
            {props.minutes < 10 ? "0" + props.minutes : props.minutes} :{" "}
            {props.seconds < 10 ? "0" + props.seconds : props.seconds} :{" "}
            {props.mseconds < 10 ? "0" + props.mseconds : props.mseconds}
          </h2>
        </div>
        <div className="col">
          <p className="lapPara">
            {props.lapTimeMinutes < 10
              ? "0" + props.lapTimeMinutes
              : props.lapTimeMinutes}{" "}
            :{" "}
            {props.lapTimeSeconds < 10
              ? "0" + props.lapTimeSeconds
              : props.lapTimeSeconds}{" "}
            :{" "}
            {props.lapTimeMseconds < 10
              ? "0" + props.lapTimeMseconds
              : props.lapTimeMseconds}
          </p>
        </div>
        <hr style={{ margin: 0 }} />
      </div>
    </div>
  );
}

export default Lap;
