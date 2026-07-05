import { useMemo, useState } from "react";
import passiveSkills from "../data/passiveSkills.json";
import { statNames } from "../data/statsNames";
import { calculatePassiveEffects } from "../utils/calculatePassiveEffects";

const emptySelection = ["", "", "", ""];

function PassiveCalculator() {
  const [selectedSkills, setSelectedSkills] = useState(emptySelection);

  function updateSkill(index, value) {
    const updated = [...selectedSkills];
    updated[index] = value;
    setSelectedSkills(updated);
  }

  const totals = useMemo(
  () => calculatePassiveEffects(selectedSkills, passiveSkills),
  [selectedSkills]
);

  return (
    <main className="page">
      <section className="card">
        <h2>Passive Calculator</h2>

        <p>Select up to four passive skills to see their combined effects.</p>

        {selectedSkills.map((selected, index) => (
          <div key={index} style={{ marginBottom: 12 }}>
            <label>Passive {index + 1}</label>

            <select
              value={selected}
              onChange={(e) => updateSkill(index, e.target.value)}
            >
              <option value="">-- None --</option>

              <option value="">-- None --</option>

{passiveSkills
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name))
  .filter(
    (skill) =>
      !selectedSkills.includes(skill.name) ||
      skill.name === selected
  )
  .map((skill) => (
    <option key={skill.name} value={skill.name}>
      {skill.name}
    </option>
  ))}
            </select>
          </div>
        ))}

        <h3>Calculated Bonuses</h3>

        {Object.keys(totals).length === 0 ? (
          <p>No passive skills selected.</p>
        ) : (
          <div className="best-pals-list">
            {Object.entries(totals).map(([stat, value]) => (
              <div className="best-pal-row" key={stat}>
                <span>{statNames[stat] || stat}</span>

                <strong
  style={{
    color: value >= 0 ? "#2e7d32" : "#c62828",
  }}
>
  {value > 0 ? "+" : ""}
  {value}%
</strong>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default PassiveCalculator;