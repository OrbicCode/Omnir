import useStore from "@stores/useStore";
import styles from "./MapSideBar.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

export default function MapSideBar() {
  const { regionData, selectedRegionId }: any = useStore();

  const selectedRegion = regionData?.[selectedRegionId];

  const labels = selectedRegion?.generationmix?.map((item: any) => item.fuel);
  const values = selectedRegion?.generationmix?.map((item: any) => item.perc);

  const pieChartData = {
    labels,
    datasets: [
      {
        label: "generation mix",
        data: values,
        backgroundColor: ["#dbead7", "#c3dcbc", "#abcea1", "#94c186", "#7cb36b", "#66a253", "#558745", "#446c37", "#33512a", "#20331a"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  return (
    <aside className={styles.container}>
      <h2>{selectedRegion?.shortname}</h2>
      <Pie data={pieChartData} options={options} />
    </aside>
  );
}
