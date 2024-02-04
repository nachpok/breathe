import { useState, useRef, useEffect } from "react";
import { insertSession } from "../drizzle";
import { useAuth } from "./AuthAndLogin/AuthContext";
import { Session } from "../drizzle/schema";
import { v4 as uuidv4 } from "uuid";
import "./Timer.css";

function Timer() {
  const { currentUser } = useAuth();
  // const [breathes, setBreathes] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isCountdown, setIsCountdown] = useState(false);
  const [countdownMilliseconds, setCountdownMilliseconds] = useState(0);
  const [rounds, setRounds] = useState<number[]>([]);
  const countRef = useRef<NodeJS.Timeout | null>(null);

  const startCountUp = () => {
    if (isCountdown) {
      setCountdownMilliseconds(0);
      setIsCountdown(false);
      clearInterval(countRef.current!);
      countRef.current = null;
    }
    if (countRef.current !== null) return;
    countRef.current = setInterval(() => {
      setMilliseconds((timer) => timer + 10);
    }, 10);
  };

  const startCountdown = () => {
    if (countRef.current !== null) return;
    setCountdownMilliseconds(15000);
    setIsCountdown(true);
    countRef.current = setInterval(() => {
      setCountdownMilliseconds((timer) => {
        if (timer === 0) {
          clearInterval(countRef.current!);
          countRef.current = null;
          setIsCountdown(false);
          return 0;
        } else {
          return timer - 10;
        }
      });
    }, 10);
  };

  const resetSession = () => {
    setRounds([]);
    if (countRef.current !== null) {
      clearInterval(countRef.current);
      countRef.current = null;
    }
    setMilliseconds(0);
    setCountdownMilliseconds(0);
    setIsCountdown(false);
  };

  const recordRound = () => {
    if (isCountdown) {
      setCountdownMilliseconds(0);
      setIsCountdown(false);
      clearInterval(countRef.current!);
      countRef.current = null;
    } else if (countRef.current !== null) {
      setRounds([...rounds, milliseconds]);
      clearInterval(countRef.current);
      countRef.current = null;
      setMilliseconds(0);
      startCountdown();
    }
  };
  //TODO set breathes option
  const saveSession = () => {
    const session: Session = {
      id: `BS-${uuidv4()}`,
      userId: `BU-${currentUser.uid}`,
      createdAt: Date.now().toString(),
      breathes: 0,
      rounds: rounds,
    };
    insertSession(session);
    resetSession();
  };

  useEffect(() => {}, [rounds]);

  const StartStopButtons = (
    <div>
      {countdownMilliseconds === 0 && milliseconds === 0 ? (
        <button onClick={startCountUp} className="button-hexagon button-start">
          Start
        </button>
      ) : (
        <div className="hexagon-boarder-stop">
          <button onClick={recordRound} className="button-hexagon button-stop">
            Stop
          </button>
        </div>
      )}
    </div>
  );

  const ResetButton = (
    <div className="hexagon-boarder-reset">
      <button onClick={resetSession} className="button-hexagon button-reset">
        Reset
      </button>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>Retention timer</h2>{" "}
      {isCountdown ? (
        <div className="timer-hexagon countdown-timer">
          <h3> {formatTimer(countdownMilliseconds)} </h3>
        </div>
      ) : (
        <div className="timer-hexagon">
          <h3>{formatTimer(milliseconds)}</h3>
        </div>
      )}
      <div>
        {rounds.length ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {ResetButton} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {StartStopButtons}
          </div>
        ) : (
          StartStopButtons
        )}
      </div>
      {rounds.map((round, index) => (
        <p key={index} className="listElement">
          Round {index + 1}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {formatRound(round)}
        </p>
      ))}
      {rounds.length ? (
        <button onClick={saveSession} className="save-button">
          Save session
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Timer;

const formatTimer = (time: number) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = (time % 1000) / 10;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
};
const formatRound = (time: number) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return `${minutes.toString().padStart(1, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
