import Header from "./components/Header";
import BasePlanner from "./pages/BasePlanner";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />

      <nav className="nav">
        <button>Home</button>
        <button>Base Planner</button>
        <button>Best Pals</button>
        <button>Pal Database</button>
        <button>My Collection</button>
      </nav>

      <BasePlanner />
    </div>
  );
}

export default App;