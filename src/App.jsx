import { useState } from "react";
import Header from "./components/Header";
import BasePlanner from "./pages/BasePlanner";
import BestPals from "./pages/BestPals";
import "./App.css";
import PalDatabase from "./pages/PalDatabase";
import PassiveSkills from "./pages/PassiveSkills";
import PassiveCalculator from "./pages/PassiveCalculator";

function App() {
  const [activePage, setActivePage] = useState("planner");

  return (
    <div className="app">
      <Header />

      <nav className="nav">
        <button onClick={() => setActivePage("planner")}>Base Planner</button>
        <button onClick={() => setActivePage("best")}>Best Pals</button>
        <button onClick={() => setActivePage("database")}>Pal Database</button>
        <button onClick={() => setActivePage("passives")}>Passive Skills</button>
        <button onClick={() => setActivePage("calculator")}>
  Passive Calculator
</button>
        <button>My Collection</button>
      </nav>

      {activePage === "planner" && <BasePlanner />}
      {activePage === "best" && <BestPals />}
      {activePage === "database" && <PalDatabase />}
      {activePage === "passives" && <PassiveSkills />}
      {activePage === "calculator" && <PassiveCalculator />}
    </div>
  );
}

export default App;