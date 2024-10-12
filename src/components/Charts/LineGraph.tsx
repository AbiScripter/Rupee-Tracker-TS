import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// import { type Graph, type ChartDataType } from "../../types";

// Registering chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Balance History",
    },
  },
};

type GraphDataSet = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};

type ChartDataType = {
  labels: string[];
  datasets: GraphDataSet[];
};

type Graph = {
  amount: number;
  createdAt: string;
};

const initalChartData: ChartDataType = {
  labels: [], //lables should be names as "lables" that why changing lablesForGraph to labels
  datasets: [
    {
      label: "",
      data: [],
      borderColor: " ",
      backgroundColor: " ",
    },
  ],
};

export function LineGraph() {
  const [chartData, setChartData] = useState<ChartDataType>(initalChartData);
  const graphData = useSelector((state: RootState) => state.user.graphData);
  console.log(graphData);

  const calcCumulative = (sortedGraphData: Graph[]) => {
    const cumulativeAmounts = [];
    const labelsForGraph = []; // dates are the labels for graph
    let prevAmount = 0;

    for (const transaction of sortedGraphData) {
      prevAmount += transaction.amount;
      cumulativeAmounts.push(prevAmount); // adding cumulative amount

      const formattedDate = `${String(new Date(transaction.createdAt)).slice(
        4,
        10
      )}`; // pushing respective dates as labels
      labelsForGraph.push(formattedDate);
    }

    return { cumulativeAmounts, labelsForGraph };
  };

  useEffect(() => {
    if (graphData.length > 0) {
      const sortedGraphData = [...graphData].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      const { cumulativeAmounts, labelsForGraph: labels } =
        calcCumulative(sortedGraphData);

      const data: ChartDataType = {
        labels, // labels for the graph
        datasets: [
          {
            label: "Balance",
            data: cumulativeAmounts,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };

      setChartData(data);
    }
  }, [graphData]);

  // console.log(chartData);
  if (!chartData) {
    return <div>Loading...</div>;
  }

  return <Line options={options} data={chartData} />;
}

export default LineGraph;
