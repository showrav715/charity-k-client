
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

import { Line } from "react-chartjs-2";
// import faker from 'faker';

export function Chart({
  borderColor,
  backgroundColor,
}: {
  borderColor: string;
  backgroundColor: string;
}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
  };

  const data = {
    labels: ["", "3", "7", "11", "15", "19", "23", "27", "31"],
    datasets: [
      {
        fill: true,
        // label: false,
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 3800 })),
        data: [
          "0",
          "2000",
          "500",
          "3000",
          "1000",
          "2500",
          "1600",
          "3200",
          "50",
        ],
        borderColor: borderColor,
        borderWidth: 1,
        backgroundColor: backgroundColor,
      },
    ],
  };
  return <Line options={options} data={data} />;
}
