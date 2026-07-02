import { workTypes } from "../data/workTypes";

function WorkPill({ work, stats }) {
  const averageLevel = (stats.totalLevel / stats.palCount).toFixed(1);

  return (
    <div className="work-pill">
      <span>
        {workTypes[work]?.icon || "•"} {work}
      </span>

      <div className="work-stats">
        <strong>{stats.palCount} Pals</strong>
        <small>Avg Lv. {averageLevel}</small>
      </div>
    </div>
  );
}

export default WorkPill;