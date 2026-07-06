import "./App.css";
import Header from "./components/ui/Header/Header";
import StatsBar from "./components/stats/StatsBar/StatsBar";
import ChartSection from "./components/ChartSection/ChartSection";
import FilterPanel from "./components/FilterPanel/FilterPanel";

function App() {

  return (
    <>
      <Header />
      <main>
        <FilterPanel />
        <StatsBar />
        <ChartSection />
      </main>
    </>
  );
}

export default App;
