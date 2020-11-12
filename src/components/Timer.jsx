import React, { useState, useRef } from "react";
import Lap from "./Lap";
import Reset from "./Reset";
import lapTime from "./var";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PauseCircleFilledOutlinedIcon from "@material-ui/icons/PauseCircleFilledOutlined";
import Fab from "@material-ui/core/Fab";

function Timer() {
  var interval = useRef(null);
  const [isStarted, setIsStarted] = useState(false);
  // these two are for start and stop purposes

  const [time, setTime] = useState({
    minutes: 0,
    seconds: 0,
    mseconds: 0,
    // timings: {
    //   minute: "",
    //   second: "",
    //   msecond: "",
    // },
  });
  // this is the actual timer that is changing its state after every 10ms

  const [laps, setLaps] = useState([]);
  // array to store each lap

  const [lt, setlt] = useState([]);
  // array to store each laptime

  const [supplement, setSupplement] = useState({
    min: 0,
    sec: 0,
    msec: 0,
  });
  // just a supporter object that is saving previous value of lap1
  // so that we can do time(lap1) - time(lap2)

  // this function handles the main timer that can go max upto 59:99:99
  function handleTimer() {
    setTime((prevTime) => {
      return { ...prevTime, mseconds: prevTime.mseconds + 1 };
    });
    // this is used for increasing the mseconds value by 1 every 10ms

    setTime((prevTime) => {
      if (prevTime.mseconds === 100) {
        if (prevTime.seconds === 59) {
          return {
            ...prevTime,
            mseconds: 0,
            seconds: 0,
            minutes: prevTime.minutes + 1,
          };
        } else {
          return {
            ...prevTime,
            mseconds: 0,
            seconds: prevTime.seconds + 1,
          };
        }
      } else {
        return { ...prevTime };
      }
    });
    // this function will update the values of seconds and minutes when
    // mseconds hit 60 and seconds hit 60
  }

  // this function is to start the timer
  function handleStart() {
    setIsStarted(true);
    interval.current = setInterval(handleTimer, 10);
  }

  // this function is to stop the timer nytime user wants to
  function handleStop() {
    setIsStarted(false);
    clearInterval(interval.current);
  }

  // this function will handle all the laps and lap intervals
  function handleLaps() {
    setSupplement({
      min: time.minutes,
      sec: time.seconds,
      msec: time.mseconds,
    });
    // this will update lap1 values everytime so that we
    // can do time(lap2) - time(lap1)

    setLaps((prevLaps) => {
      return [...prevLaps, time];
    });
    // this will update the array that contains laps and will add laps
    // to it when user clicks on lap button

    // setTime((prevTime) => {

    const totalTime = time.minutes * 6000 + time.seconds * 100 + time.mseconds;
    const totalPrevTime =
      supplement.min * 6000 + supplement.sec * 100 + supplement.msec;
    const finalTime = totalTime - totalPrevTime;

    lapTime.mins = Math.floor(finalTime / 6000);
    lapTime.secs = Math.floor((finalTime - lapTime.mins * 6000) / 100);
    lapTime.msecs = finalTime - lapTime.mins * 6000 - lapTime.secs * 100;
    // this laptime object will contain the difference between
    // time(lap2) - time(lap1)

    setlt((prevlt) => {
      return [
        ...prevlt,
        { mins: lapTime.mins, secs: lapTime.secs, msecs: lapTime.msecs },
      ];
    });
    // this will update the lap time array everytime when user clicks
    // on the lap button

    // return {
    //   ...prevTime,
    //   timings: {
    //     minute: lapTime.mins,
    //     second: lapTime.secs,
    //     msecond: lapTime.msecs,
    //   },
    //};
    //});
  }

  // this function will reset the values to 00:00:00 and will delete
  // every single data present previously in any array/object
  function reset(id) {
    setTime({
      minutes: 0,
      seconds: 0,
      mseconds: 0,
      // timings: {
      //   minute: 0,
      //   second: 0,
      //   msecond: 0,
      // },
    });
    setSupplement({
      min: 0,
      sec: 0,
      msec: 0,
    });
    clearInterval(interval.current);
    setIsStarted(false);
    setLaps([]);
    setlt([]);
  }

  return (
    <div>
      <div className="mainTimerHeadingDiv">
        <h1 className="mainTimerHeading">
          {time.minutes < 10 ? "0" + time.minutes : time.minutes} :{" "}
          {time.seconds < 10 ? "0" + time.seconds : time.seconds} :{" "}
          {time.mseconds < 10 ? "0" + time.mseconds : time.mseconds}
        </h1>
      </div>
      <div className="timerButtons">
        <div className="container">
          <div className="row">
            <div className="col">
              <Reset onReset={reset} />
            </div>
            <div className="col">
              {!isStarted ? (
                <Fab
                  size="large"
                  color="secondary"
                  onClick={handleStart}
                  style={{ outline: "none" }}
                >
                  <PlayCircleFilledWhiteIcon />
                </Fab>
              ) : (
                <Fab
                  size="large"
                  color="primary"
                  aria-label="add"
                  onClick={handleStop}
                  style={{ outline: "none" }}
                >
                  <PauseCircleFilledOutlinedIcon />
                </Fab>
              )}
            </div>
            <div className="col">
              <Fab
                size="large"
                color="secondary"
                aria-label="add"
                onClick={handleLaps}
                disabled={!isStarted ? "disabled" : null}
                style={{ outline: "none" }}
              >
                <AccessTimeIcon />
              </Fab>
            </div>
          </div>
        </div>
      </div>
      <div
        className="lap"
        style={
          laps.length > 0
            ? { border: "2px solid", boxShadow: "3px 5px lightgray" }
            : null
        }
      >
        {laps.map((lap, index) => {
          const lapT = lt.filter((lt, lindex) => {
            return lindex === index;
          });
          return (
            <Lap
              key={index}
              id={index}
              minutes={lap.minutes}
              seconds={lap.seconds}
              mseconds={lap.mseconds}
              lapTimeMinutes={lapT[0].mins}
              lapTimeSeconds={lapT[0].secs}
              lapTimeMseconds={lapT[0].msecs}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Timer;
