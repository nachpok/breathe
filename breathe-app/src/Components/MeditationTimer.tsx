import { useRef, useState } from "react";
import { useAuth } from "./AuthAndLogin/AuthContext";
import { Meditation } from "../../drizzle/migrations/schema";
import { formatTimer } from "./RetentionTimer";
import { v4 as uuidv4 } from "uuid";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
import "./Timer.css";
import { ButtonLink } from "./HomePage";
import { LeftOutlined } from "@ant-design/icons";
import { TimePicker } from "antd";
import { insertMeditation } from "../drizzle";
function MeditationTimer() {
  const { currentUser } = useAuth();
  const [milliseconds, setMilliseconds] = useState(600000);
  const [targetTime, setTargetTime] = useState(600000);
  const [running, setRunning] = useState(false);
  const countRef = useRef<NodeJS.Timeout | null>(null);

  const startCountdown = () => {
    if (countRef.current !== null) return;
    setRunning(true);
    countRef.current = setInterval(() => {
      setMilliseconds((timer) => {
        if (timer <= 10) {
          endSession();
        }
        return timer - 10;
      });
    }, 10);
  };
  const resumeTimer = () => {
    if (countRef.current !== null) return;
    setRunning(true);
    countRef.current = setInterval(() => {
      setMilliseconds((timer) => {
        if (timer <= 10) {
          endSession();
        }
        return timer - 10;
      });
    }, 10);
  };
  const endSession = () => {
    const audioElement = document.querySelector("audio");
    if (audioElement) {
      audioElement.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    }
    if (countRef.current !== null) {
      clearInterval(countRef.current);
      countRef.current = null;
    }
    setRunning(false);
  };
  const saveMeditation = () => {
    const meditation: Meditation = {
      id: `BS-${uuidv4()}`,
      userId: `BU-${currentUser.uid}`,
      timestamp: Date.now().toString(),
      milliseconds: targetTime - milliseconds,
    };
    console.log("meditation: ", meditation);
    insertMeditation(meditation);
    resetMeditation();
  };
  const resetMeditation = () => {
    setMilliseconds(targetTime);
    setRunning(false);
    if (countRef.current !== null) {
      clearInterval(countRef.current);
      countRef.current = null;
    }
  };
  const pauseTimer = () => {
    if (countRef.current !== null) {
      clearInterval(countRef.current);
      countRef.current = null;
    }
    setRunning(false);
  };
  const setTime = (time: Dayjs) => {
    if (time === null) {
      setMilliseconds(0);
      setTargetTime(0);
      return;
    }
    const minutes = time.minute() as number;
    const hours = time.hour() as number;
    const timeToMilliseconds = minutes * 1000 * 60 + hours * 1000 * 60 * 60;
    setMilliseconds(timeToMilliseconds);
    setTargetTime(timeToMilliseconds);
  };
  const StartStopButtons = (
    <div>
      {!running ? (
        <button
          onClick={startCountdown}
          className="button-hexagon button-start"
        >
          Play
        </button>
      ) : !running ? (
        <div className="hexagon-boarder-stop">
          <button onClick={resumeTimer} className="button-hexagon button-stop">
            Resume
          </button>
        </div>
      ) : (
        <div className="hexagon-boarder-stop">
          <button onClick={pauseTimer} className="button-hexagon button-stop">
            Pause
          </button>
        </div>
      )}
    </div>
  );

  const ResetButton = (
    <div className="hexagon-boarder-reset">
      <button onClick={resetMeditation} className="button-hexagon button-reset">
        Reset
      </button>
    </div>
  );

  return (
    <div className="app">
      <ButtonLink to="/" label={<LeftOutlined />} className="backButton" />
      <div className="timer">
        <audio src="/singing-bowl-gong.mp3"></audio>
        <h2 className="timer-header">Meditation Timer</h2>
        <div className="timer-hexagon">
          <h3>{formatTimer(milliseconds)}</h3>
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {ResetButton} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {StartStopButtons}
          </div>
        </div>
        <TimePicker
          className=" meditation-set-save-button"
          format={"HH:mm"}
          placeholder={"Set timer"}
          defaultValue={dayjs("00:10", "HH:mm")}
          hideDisabledOptions={true}
          onChange={setTime}
          changeOnScroll
          needConfirm={false}
          showNow={false}
          allowClear={false}
        />
        <button
          onClick={saveMeditation}
          className="save-button meditation-set-save-button"
          disabled={running}
        >
          Save session
        </button>
      </div>
    </div>
  );
}

export default MeditationTimer;
