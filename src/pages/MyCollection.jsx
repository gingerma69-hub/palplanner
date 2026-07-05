import { useEffect, useState } from "react";
import pals from "../data/pals.json";

function MyCollection() {
  const [collection, setCollection] = useState(() => {
    const saved = localStorage.getItem("palplannerCollection");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "palplannerCollection",
      JSON.stringify(collection)
    );
  }, [collection]);

  function addPal() {
    setCollection([
      ...collection,
      {
        id: Date.now(),
        basePal: "",
        nickname: "",
        gender: "",
        alpha: false,
        lucky: false,
        passives: ["", "", "", ""],
      },
    ]);
  }

  function updatePal(id, field, value) {
    setCollection((current) =>
      current.map((pal) =>
        pal.id === id ? { ...pal, [field]: value } : pal
      )
    );
  }

  return (
    <main className="page">
      <section className="card">
        <h2>My Collection</h2>

        <p>Keep track of the Pals you own.</p>

        <button onClick={addPal}>+ Add Pal</button>

        {collection.map((pal) => (
          <div className="database-pal-card" key={pal.id}>
            <label>Pal</label>

            <select
              value={pal.basePal}
              onChange={(e) =>
                updatePal(pal.id, "basePal", e.target.value)
              }
            >
              <option value="">Select a Pal...</option>

              {pals
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((entry) => (
                  <option key={entry.name} value={entry.name}>
                    {entry.name}
                  </option>
                ))}
            </select>

            <label>Nickname</label>

            <input
              value={pal.nickname}
              onChange={(e) =>
                updatePal(pal.id, "nickname", e.target.value)
              }
            />

            <label>Gender</label>

            <select
              value={pal.gender}
              onChange={(e) =>
                updatePal(pal.id, "gender", e.target.value)
              }
            >
              <option value="">Unknown</option>
              <option value="Male">Male ♂</option>
              <option value="Female">Female ♀</option>
            </select>
          </div>
        ))}
      </section>
    </main>
  );
}

export default MyCollection;