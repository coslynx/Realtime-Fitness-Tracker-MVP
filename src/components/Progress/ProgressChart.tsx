import React, { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
import { api } from "../../utils/api";
import { useProgressContext } from "../../hooks/useProgress";

Chart.register(...registerables);

interface ProgressChartProps {
  goalType: "weight_loss" | "distance" | "muscle_gain";
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goalType }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const { progressData } = useProgressContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getProgressData(goalType);
        const formattedData = response.data.map((dataPoint: any) => ({
          date: new Date(dataPoint.date).toLocaleDateString(),
          value: dataPoint.value,
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    fetchData();
  }, [goalType, progressData]);

  useEffect(() => {
    if (chartData.length > 0) {
      const chartCanvas = document.getElementById("progressChart") as HTMLCanvasElement;
      const myChart = new Chart(chartCanvas, {
        type: "line",
        data: {
          labels: chartData.map((dataPoint: any) => dataPoint.date),
          datasets: [
            {
              label: `Progress for ${goalType}`,
              data: chartData.map((dataPoint: any) => dataPoint.value),
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div>
      <canvas id="progressChart" width="400" height="200"></canvas>
    </div>
  );
};

export default ProgressChart;