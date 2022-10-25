import React from "react";
import {useState, useEffect} from "react";
import TimeInput from "./TimeInput";
import ProgressBar from "./ProgressBar";
import CountdownCircle from "./TimerAnimation";
import PlayButton from "../assets/play.png";
import PauseButton from "../assets/pause.png"

function convertInputTime(inputMillis) {
    return Math.floor(inputMillis / 60000);
}

function convertInputTimeToSeconds(inputMillis) {
    return ((inputMillis % 60000) / 1000).toFixed(0);
}

function getTime(time) {
    return time.toString().padStart(2, "0")
}

const Timer = () => {
    const SELECT_INTERVALS = [1000, 2000, 5000];

    const [progress, setProgress] = React.useState(50);
    const [timeleft, setTimeLeft] = useState(convertInputTime(TimeInput));
    const [autoStart, setAutoStart] = useState(false);
    const [intervals, setIntervals] = useState(1000);

    const MINUTES = getTime(Math.floor(timeleft / 60));
    const SECONDS = getTime(timeleft - MINUTES * 60);

    const timePercent = ((Math.floor(((timeleft * 60000) * 100) / TimeInput * 60000)) / 60000)
    const minutesRadius = mapNumber(MINUTES, 60, 0, 0, 360);
    const secondsRadius = mapNumber(SECONDS, 60, 0, 0, 360);

    function mapNumber(number, in_min, in_max, out_min, out_max) {
        return (
            ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
        );
    }

    const submit = () => {
        console.log(+convertInputTimeToSeconds(intervals));
    };

    useEffect(() => {
        let interval = setInterval(() => {
            autoStart &&
            setTimeLeft((timeleft => timeleft >= 1 ? timeleft - +(intervals / 1000) : 0))
        }, +intervals);
        if (timeleft === 0) {
            setAutoStart(false)
            onTimeEnd();
        } else if (timeleft > 0) {
            console.log("Залишилось часу: ", `${TimeInput - (TimeInput - timeleft * 60000)}ms`);
        }
        return () => {
            clearInterval(interval);
        }
    }, [timeleft, autoStart, TimeInput])

    const handleStart = () => {
        if (timeleft === 0) {
            setTimeLeft(convertInputTime(TimeInput));
        }
        setAutoStart(true);
        onTimeStart();
    }

    const handlePause = () => {
        setAutoStart(false);
        onTimePause();
    }

    const onTimeStart = () => {
        console.log("Таймер запущено!")
    }

    const onTimeEnd = () => {
        console.log("Час вийшов!");
    }

    const onTimePause = () => {
        console.log("Таймер на паузі!");
    }

    return (
        <main className="wrapper">
            <div className="countdown-wrapper">
                <div className="countdown-item">
                    <div className="clock">
                        <CountdownCircle radius=
                                             {minutesRadius}
                        />
                        {MINUTES}
                    </div>
                    <div className="clock">:</div>
                    <div className="clock">
                        <CountdownCircle radius=
                                             {secondsRadius}
                        />
                        {SECONDS}
                    </div>
                </div>
            </div>
            <div className="navigation-wrapper">
                <div>
                    {autoStart ? (
                        <button className="buttons" onClick={handlePause}><img src={PauseButton}/> Pause</button>
                    ) : (
                        <button className="buttons" onClick={handleStart}><img src={PlayButton}/> Start</button>
                    )}
                </div>
                <div className="options">
                    <form className="form-wrapper">
                        <div>
                            <label htmlFor="intervals">Select an Interval:</label>
                        </div>
                        <div className="submit-wrapper">
                            <select
                                defaultValue={SELECT_INTERVALS[0]}
                                onChange={(event) => setIntervals(+event.target.value)}>
                                {SELECT_INTERVALS.map((value) => (
                                    <option value={value} key={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                            <button className="submit-button" type="button" onClick={submit}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="progressbar-wrapper">
                <ProgressBar progress={timePercent}/>
            </div>
        </main>
    )
}

export default Timer;