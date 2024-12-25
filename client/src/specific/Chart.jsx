import React from 'react'
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  scales
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  scales
);

import {
  purple,
  purpleLight,
} from "../constants/color";

import { getLast7Days } from '../lib/features';

const labels = getLast7Days();

const LineChartoptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Messages per Day'
    },

    scales: {
      x: {
        grid: {
          display: true
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true
        },
      },


    }
  }
};

export const LineChart = ({ value=[] }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Messages',
        data: value,
        fill: true,
        borderColor: purple,
        backgroundColor: purpleLight,
        tension: 0.1
      }
    ]
  };

  return <Line options={LineChartoptions} data={data} />;
};

const DoughnutChartoptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    }
  }
};

export const DoughnutChart = ({value=[],labels=[]}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: value,
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
        ],
        offset: 40,
      }
    ]
  };



  return <Doughnut style = {{ zIndex:10}} data={data} options={DoughnutChartoptions} />; // on hover erffeect is not working 
  // because it is on backward move it up
};