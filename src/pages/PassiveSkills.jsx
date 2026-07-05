import { useState } from "react";
import passiveSkills from "../data/passiveSkills.json";

function PassiveSkills() {
  const [searchText, setSearchText] = useState("");

  const filteredSkills = passiveSkills.filter((skill) =>
    skill.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <main className="page">
      <section className="card">
        <h2>Passive Skills</h2>

        <p>Search passive skills and review their positive and negative effects.</p>

        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search passive skills..."
        />

        <div className="passive-list">
          {filteredSkills.map((skill) => (
            <div className="passive-card" key={skill.name}>
              <h3>{skill.name}</h3>

            

              {(skill.positive || skill.positiveEffect) && (
  <div>
    <strong>Positive</strong>
    {(skill.positive || [skill.positiveEffect]).map((effect) => (
      <p key={effect}>{effect}</p>
    ))}
  </div>
)}

{(skill.negative || skill.negativeEffect) && (
  <div>
    <strong>Negative</strong>
    {(skill.negative || [skill.negativeEffect]).map((effect) => (
      <p key={effect}>{effect}</p>
    ))}
  </div>
)}

              {skill.exclusive && <p className="exclusive-badge">Exclusive</p>}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default PassiveSkills;