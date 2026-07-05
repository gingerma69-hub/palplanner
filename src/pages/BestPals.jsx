import { useState } from "react";
import pals from "../data/pals.json";
import { workTypes } from "../data/workTypes";

const workTypeNames = Object.keys(workTypes);

function BestPals() {
  const [selectedWork, setSelectedWork] = useState("Mining");
  const [minimumLevel, setMinimumLevel] = useState(1);

  const matchingPals = pals
    .filter((pal) => pal.work?.[selectedWork] >= minimumLevel)
    .sort((a, b) => b.work[selectedWork] - a.work[selectedWork]);

  return (
    <main className="page">
      <section className="card">
        <h2>Best Pals by Work Type</h2>

        <p>Choose a work type to see the strongest Pals for that job.</p>

        <div className="filter-row">
          <label className="filter-label">
            Work Type
            <select
              value={selectedWork}
              onChange={(event) => setSelectedWork(event.target.value)}
            >
              {workTypeNames.map((work) => (
                <option key={work} value={work}>
                  {workTypes[work].icon} {work}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-label">
            Minimum Level
            <select
              value={minimumLevel}
              onChange={(event) => setMinimumLevel(Number(event.target.value))}
            >
              <option value={1}>Lv. 1+</option>
              <option value={2}>Lv. 2+</option>
              <option value={3}>Lv. 3+</option>
              <option value={4}>Lv. 4+</option>
            </select>
          </label>
        </div>

        <div className="best-pals-list">
          {matchingPals.map((pal) => {
            const otherJobs = Object.entries(pal.work || {})
              .filter(([work]) => work !== selectedWork)
              .sort((a, b) => b[1] - a[1]);

            return (
              <div className="best-pal-row" key={pal.name}>
                <div>
                  <strong>{pal.name}</strong>

                  <div className="pal-elements">{pal.elements.join(" / ")}</div>

                  {otherJobs.length > 0 && (
                    <div className="other-jobs">
                      {otherJobs.map(([work, level]) => (
                        <span key={work}>
                          {workTypes[work]?.icon || "•"} {work} Lv.{level}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="best-level">Lv. {pal.work[selectedWork]}</div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default BestPals;