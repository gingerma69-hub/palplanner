import { workTypes } from "../data/workTypes";

function PalCard({ pal }) {
  return (
    <div className="pal-card">
      <h4>{pal.name}</h4>

      <div className="mini-work-list">
        {Object.entries(pal.work || {}).map(([work, level]) => (
          <span key={work}>
            {workTypes[work]?.icon || "•"} {work} Lv.{level}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PalCard;