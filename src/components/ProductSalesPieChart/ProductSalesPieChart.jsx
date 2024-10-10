import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const ProductSalesPieChart = ({ data }) => {
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);

  const chartColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
  ];

  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.sales),
        backgroundColor: chartColors,
        borderColor: '#333333',  // Changed to a darker color
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = ((value / totalSales) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        color: '#FFFFFF',
        font: {
          weight: 'bold',
          size: 12,
        },
        formatter: (value, ctx) => {
          const percentage = ((value / totalSales) * 100).toFixed(1);
          return window.innerWidth >= 768 ? `${percentage}%` : '';
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-48 sm:h-56 md:h-64">
        <Pie data={chartData} options={options} />
      </div>
      <div className="w-full mt-4 text-center">
        <ul className="text-sm space-y-1 hidden md:block">
          {data.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className="flex items-center">
                <span 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{backgroundColor: chartColors[index]}}
                ></span>
                <span>{item.name}</span>
              </span>
              <span>
                {((item.sales / totalSales) * 100).toFixed(1)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductSalesPieChart;