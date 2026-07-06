import "./App.css";
import Header from "./components/ui/Header/Header";
import StatsBar from "./components/stats/StatsBar/StatsBar";
import ChartSection from "./components/ChartSection/ChartSection";

function App() {

  return (
    <>
      <Header />
      <main>
        <StatsBar />
        <ChartSection />
      </main>
    </>
  );
}

export default App;
