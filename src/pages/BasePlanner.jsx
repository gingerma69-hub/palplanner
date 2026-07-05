import { useEffect, useState } from "react";
import pals from "../data/pals.json";
import BaseTabs from "../components/BaseTabs";
import PalCard from "../components/PalCard";
import WorkPill from "../components/WorkPill";

const baseSlots = Array.from({ length: 30 }, (_, index) => index + 1);

function BasePlanner() {
  const [bases, setBases] = useState(() => {
    const saved = localStorage.getItem("palplannerBases");

    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Main Base",
            pals: Array(30).fill(""),
          },
        ];
  });

  const [activeBaseId, setActiveBaseId] = useState(() => {
    const saved = localStorage.getItem("palplannerActiveBaseId");
    return saved ? Number(saved) : 1;
  });

  const activeBase = bases.find((base) => base.id === activeBaseId) || bases[0];
  const selectedPals = activeBase.pals;
  const normalizedSelectedPals = [
  ...selectedPals,
  ...Array(30 - selectedPals.length).fill(""),
].slice(0, 30);

  useEffect(() => {
    localStorage.setItem("palplannerBases", JSON.stringify(bases));
    localStorage.setItem("palplannerActiveBaseId", activeBaseId);
  }, [bases, activeBaseId]);

  function updateSlot(index, palName) {
    setBases((currentBases) =>
      currentBases.map((base) => {
        if (base.id !== activeBaseId) return base;

        const updatedPals = [...base.pals];
        updatedPals[index] = palName;

        return {
          ...base,
          pals: updatedPals,
        };
      })
    );
  }

  function addBase() {
  const newBase = {
    id: Date.now(),
    name: `Base ${bases.length + 1}`,
    pals: Array(30).fill(""),
  };

  setBases([...bases, newBase]);
  setActiveBaseId(newBase.id);
}

function renameBase(baseId, newName) {
  setBases((currentBases) =>
    currentBases.map((base) =>
      base.id === baseId
        ? { ...base, name: newName }
        : base
    )
  );
}

function deleteBase(baseId) {
  const remainingBases = bases.filter((base) => base.id !== baseId);

  if (remainingBases.length === 0) return;

  setBases(remainingBases);

  if (activeBaseId === baseId) {
    setActiveBaseId(remainingBases[0].id);
  }
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
        <h2>{activeBase.name}</h2>

        <BaseTabs
  bases={bases}
  activeBaseId={activeBaseId}
  onSelectBase={setActiveBaseId}
  onAddBase={addBase}
  onDeleteBase={deleteBase}
  onRenameBase={renameBase}
/>

        <p>
  Assign up to 30 Pals to this base and review its work suitability coverage.
</p>

        <datalist id="pal-options">
          {pals.map((pal) => (
            <option key={pal.name} value={pal.name} />
          ))}
        </datalist>

        <div className="planner-grid">
          <div>
            <h3>Assigned Pals</h3>

            <div className="slot-list">
              {baseSlots.map((slotNumber, index) => {
                const selectedPal = pals.find(
                  (pal) => pal.name === normalizedSelectedPals[index]
                );

                return (
                  <div className="slot-row" key={slotNumber}>
                    <span>Base Slot {slotNumber}</span>

                    <input
                      list="pal-options"
                      value={normalizedSelectedPals[index]}
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
            <h3>Work Coverage</h3>

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