import { useEffect, useState } from "react";
import pals from "../data/pals.json";
import PalCard from "../components/PalCard";
import WorkPill from "../components/WorkPill";

const baseSlots = Array.from({ length: 15 }, (_, index) => index + 1);

function BasePlanner() {
  const [selectedPals, setSelectedPals] = useState(() => {
  const saved = localStorage.getItem("basePlanner");

  return saved
    ? JSON.parse(saved)
    : Array(15).fill("");
});
useEffect(() => {
  localStorage.setItem(
    "basePlanner",
    JSON.stringify(selectedPals)
  );
}, [selectedPals]);
  function updateSlot(index, palName) {
    const updatedPals = [...selectedPals];
    updatedPals[index] = palName;
    setSelectedPals(updatedPals);
  }

  const workTotals = {};

  selectedPals.forEach((palName) => {
    if (!palName) return;

    const pal = pals.find((p) => p.name === palName);
    if (!pal) return;

    Object.entries(pal.work || {}).forEach(([work, level]) => {
  if (!workTotals[work]) {
    workTotals[work] = {
      totalLevel: 0,
      palCount: 0,
    };
  }

  workTotals[work].totalLevel += level;
  workTotals[work].palCount += 1;
});
  });

  return (
    <main className="page">
      <section className="card">
        <h2>Base Planner</h2>

        <p>
          Choose up to 15 Pals assigned to one base and compare their work
          suitability.
        </p>

        <datalist id="pal-options">
          {pals.map((pal) => (
            <option key={pal.name} value={pal.name} />
          ))}
        </datalist>

        <div className="planner-grid">
          <div>
            <h3>Base Slots</h3>

            <div className="slot-list">
              {baseSlots.map((slotNumber, index) => {
                const selectedPal = pals.find(
                  (pal) => pal.name === selectedPals[index]
                );

                return (
                  <div className="slot-row" key={slotNumber}>
                    <span>Base Slot {slotNumber}</span>

                    <input
                      list="pal-options"
                      value={selectedPals[index]}
                      onChange={(event) =>
                        updateSlot(index, event.target.value)
                      }
                      placeholder="Search for a Pal..."
                    />

                    {selectedPal && <PalCard pal={selectedPal} />}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3>Base Coverage</h3>

            <div className="work-list">
              {Object.entries(workTotals).length === 0 ? (
                <p>Select some Pals to begin.</p>
              ) : (
                Object.entries(workTotals)
  .sort((a, b) => b[1].totalLevel - a[1].totalLevel)
  .map(([work, stats]) => (
    <WorkPill key={work} work={work} stats={stats} />
  ))
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BasePlanner;