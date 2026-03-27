import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Chart thematic config - Premium SaaS Look
ChartJS.defaults.color = '#94A3B8';
ChartJS.defaults.font.family = "'Plus Jakarta Sans', system-ui, sans-serif";
ChartJS.defaults.plugins.tooltip.backgroundColor = 'rgba(30, 41, 59, 0.9)';
ChartJS.defaults.plugins.tooltip.titleColor = '#F8FAFC';
ChartJS.defaults.plugins.tooltip.bodyColor = '#E2E8F0';
ChartJS.defaults.plugins.tooltip.titleFont = { size: 13, weight: 'bold', family: "'Plus Jakarta Sans', sans-serif" };
ChartJS.defaults.plugins.tooltip.bodyFont = { size: 13, family: "'Plus Jakarta Sans', sans-serif" };
ChartJS.defaults.plugins.tooltip.borderColor = 'rgba(255, 255, 255, 0.1)';
ChartJS.defaults.plugins.tooltip.borderWidth = 1;
ChartJS.defaults.plugins.tooltip.padding = 12;
ChartJS.defaults.plugins.tooltip.cornerRadius = 12;
ChartJS.defaults.plugins.tooltip.boxPadding = 6;
ChartJS.defaults.plugins.tooltip.usePointStyle = true;

const CHART_COLORS = [
  '#6366F1', // Indigo primary
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#38BDF8', // Sky
];

export const CategoryChart = ({ expenses }) => {
  const data = useMemo(() => {
    const categoryTotals = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});
    
    const sortedCategories = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1]);

    return {
      labels: sortedCategories.map(c => c[0]),
      datasets: [
        {
          data: sortedCategories.map(c => c[1]),
          backgroundColor: CHART_COLORS,
          borderWidth: 0,
          hoverOffset: 8,
          borderRadius: 4,
          spacing: 2
        },
      ],
    };
  }, [expenses]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { animateScale: true, animateRotate: true, duration: 1000, easing: 'easeOutQuart' },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: { size: 12, weight: '500' }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => ` $${context.raw.toLocaleString(undefined, {minimumFractionDigits: 2})}`
        }
      }
    },
    cutout: '75%',
  };

  return <Doughnut data={data} options={options} />;
};

export const WeeklyTrendChart = ({ expenses }) => {
  const data = useMemo(() => {
    const labels = [];
    const totals = new Array(7).fill(0);
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      labels.push(d.toLocaleDateString('en-US', { weekday: 'short' }));
    }

    expenses.forEach(exp => {
      const expDate = new Date(exp.date);
      const diffTime = Math.abs(today - expDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      if (diffDays <= 7 && diffDays > 0) {
        totals[7 - diffDays] += exp.amount;
      } else if (diffDays === 0) {
        totals[6] += exp.amount;
      }
    });

    return {
      labels,
      datasets: [
        {
          label: 'Spent',
          data: totals,
          backgroundColor: (context) => {
            const chart = context.chart;
            const {ctx, chartArea} = chart;
            if (!chartArea) return '#6366F1';
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, 'rgba(99, 102, 241, 0.5)');
            gradient.addColorStop(1, '#8B5CF6');
            return gradient;
          },
          borderRadius: 8,
          borderSkipped: false,
          barThickness: 'flex',
          maxBarThickness: 32,
        },
      ],
    };
  }, [expenses]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { y: { duration: 1000, easing: 'easeOutQuart' } },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` $${context.raw.toLocaleString(undefined, {minimumFractionDigits: 2})}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
        border: { display: false },
        ticks: { callback: (value) => '$' + value, font: { size: 11 } }
      },
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { font: { size: 11, weight: '500' } }
      }
    }
  };

  return <Bar data={data} options={options} />;
};
