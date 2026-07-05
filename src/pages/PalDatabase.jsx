import { useState } from "react";
import pals from "../data/pals.json";
import { workTypes } from "../data/workTypes";

function PalDatabase() {
  const [searchText, setSearchText] = useState("");

  const filteredPals = pals.filter((pal) =>
    pal.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <main className="page">
      <section className="card">
        <h2>Pal Database</h2>

        <p>Search all Pals and review their elements and work suitability.</p>

        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search for a Pal..."
        />

        <div className="pal-database-list">
          {filteredPals.map((pal) => (
            <div className="database-pal-card" key={pal.name}>
              <h3>{pal.name}</h3>

              <div className="pal-elements">{pal.elements.join(" / ")}</div>

              <div className="other-jobs">
                {Object.entries(pal.work || {}).map(([work, level]) => (
                  <span key={work}>
                    {workTypes[work]?.icon || "•"} {work} Lv.{level}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default PalDatabase;