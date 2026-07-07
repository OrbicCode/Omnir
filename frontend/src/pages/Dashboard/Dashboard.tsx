import ChartSection from "../../components/ChartSection/ChartSection";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import StatsBar from "../../components/stats/StatsBar/StatsBar";

export default function Dashboard() {
  return (
    <main>
      <FilterPanel />
      <StatsBar />
      <ChartSection />
    </main>
  )
}