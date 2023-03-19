import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const SummaryChart = ({ answered, total }) => {
  const data = {
    labels: ["Answered Question", "Unanswered Question", "Total Question"],
    datasets: [
      {
        label: "Question",
        data: [answered, total - answered, total],
        backgroundColor: [
          "rgb(34, 197, 94, 0.5)",
          "rgb(229, 231, 235, 0.5)",
          "rgb(239, 68, 68, 0.5)",
        ],
        borderColor: [
          "rgb(34, 197, 94, 0.8)",
          "rgb(229, 231, 235, 0.8)",
          "rgb(239, 68, 68, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};

export default SummaryChart;
