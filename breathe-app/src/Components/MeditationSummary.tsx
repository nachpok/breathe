import { Meditation } from "../../drizzle/migrations/schema";
import { formatTime } from "./SessionsSummary";

interface MeditationsSummary {
  numOfMeditations: number;
  longestMeditation: number;
  totalMeditationTimeMS: number;
  avgMeditationMS: number;
}

function MeditationSummary({ meditations }: { meditations: Meditation[] }) {
  if (!meditations.length) {
    return <h1>YOU HAVE NO MEDITATIONS</h1>;
  }
  const summary = extractMeditationsStatistics(meditations);

  return (
    <div className="summary-container">
      <div className="bar-label-container">
        <span className="bar-label">Average meditation</span>
        <span className="bar-label">Longest meditation</span>
      </div>
      <div className="retention-var">
        <div className="avg-bar">
          <span className="bar-text">
            {formatTime(summary.avgMeditationMS)}
          </span>
        </div>
        <div className="max-bar">
          <span className="bar-text">
            {formatTime(summary.longestMeditation)}
          </span>
        </div>
      </div>

      <table>
        <tbody>
          <tr>
            <td>
              <span className="summary-value">{summary.numOfMeditations}</span>
            </td>

            <td>
              <span className="summary-value">
                {formatTime(summary.totalMeditationTimeMS)}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span className="summary-label">Meditation sessions</span>
            </td>

            <td>
              <span className="summary-label">Total meditation time</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MeditationSummary;

function extractMeditationsStatistics(
  meditations: Meditation[]
): MeditationsSummary {
  const numOfMeditations = meditations.length;
  let meditationsTimeMs: number[] = [];
  meditations.forEach((m) => {
    if (m.milliseconds !== null) {
      meditationsTimeMs = meditationsTimeMs.concat(m.milliseconds);
    }
  });

  const longestMediation = Math.max(...meditationsTimeMs);
  const totalMeditationTimeMS = meditationsTimeMs.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const avgMeditationMS = totalMeditationTimeMS / numOfMeditations;

  return {
    numOfMeditations: numOfMeditations,
    longestMeditation: longestMediation,
    totalMeditationTimeMS: totalMeditationTimeMS,
    avgMeditationMS: avgMeditationMS,
  };
}
