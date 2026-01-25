"use client";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Donations",
      data: [1200, 1900, 800, 1500, 2100],
      backgroundColor: "#2563eb",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" as const },
    title: { display: true, text: "Monthly Donations" },
  },
};

interface ChartProps {
  donations?: Array<{
    created_at: string;
    amount: number;
  }>;
}

export function Chart({ donations = [] }: ChartProps) {
  // Generate chart data from donations if provided
  const chartData = donations.length > 0 ? {
    labels: donations.slice(0, 7).map(d => new Date(d.created_at).toLocaleDateString()),
    datasets: [
      {
        label: "Donations",
        data: donations.slice(0, 7).map(d => d.amount),
        backgroundColor: "#2563eb",
      },
    ],
  } : data;

  return <Bar data={chartData} options={options} />;
}

// Pie chart for spending breakdown
const pieData = {
  labels: ["Education", "Healthcare", "Admin", "Other"],
  datasets: [
    {
      label: "Spending Breakdown",
      data: [55, 25, 10, 10],
      backgroundColor: ["#34d399", "#60a5fa", "#fbbf24", "#a78bfa"],
    },
  ],
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" as const },
    title: { display: true, text: "Donation Spending Breakdown" },
  },
};

export function PieChart() {
  return <Pie data={pieData} options={pieOptions} />;
} 