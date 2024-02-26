import { useState, useRef, useEffect } from "react";
import { insertSession } from "../drizzle";
import { useAuth } from "./AuthAndLogin/AuthContext";
import { Session } from "../../drizzle/migrations/schema";
import { v4 as uuidv4 } from "uuid";
import "./Timer.css";
import { RoundsList } from "./RoundsList";

function Timer() {
  const { currentUser } = useAuth();
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
      let gongLogged = false; //flag to avoid calling playGong() twice each round
      setMilliseconds((timer) => {
        if (timer !== 0 && timer % 60000 === 0 && !gongLogged) {
          gongLogged = true;
          playGong();
        } else if (timer % 60000 !== 0) {
          gongLogged = false;
        }
        return timer + 10;
      });
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
  const saveSession = () => {
    const session: Session = {
      id: `BS-${uuidv4()}`,
      userId: `BU-${currentUser.uid}`,
      timestamp: Date.now().toString(),
      rounds: rounds,
    };
    insertSession(session);
    resetSession();
  };

  const playGong = () => {
    const audioElement = document.querySelector("audio");
    if (audioElement) {
      audioElement.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    }
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
    <div className="timer">
      <audio src="/singing-bowl-gong.mp3"></audio>
      <h2 className="timer-header">Retention timer</h2>
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
      <RoundsList rounds={rounds} />
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
