'use client'
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);
import { useGlobalContext } from '@/app/GlobalContext';
import c from './Horizontal.module.css';



export default function HorizontalCharts() {
  const { serviceData } = useGlobalContext();
  const [expenses, setExpenses] = useState([]);
  const [prices, setPrices] = useState(); //  [0, 0, 0, 0, 0, 0, 0, 355, 0, 0, 0, 0]
  
  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    try {
      const res = await axios.get('/api/service-orders-prices');
      setExpenses(res.data.expenses);

      const aggregatedPrices = aggregateExpensesByMonth(res.data.expenses);
      setPrices(aggregatedPrices); // Set the prices state with the aggregated amounts
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }

  const aggregateExpensesByMonth = (expenses) => {
    // Initialize an array with 12 elements (one for each month), all set to 0
    const monthlyTotals = new Array(12).fill(0);

    // Loop through each expense and add its amount to the corresponding month
    expenses.forEach(expense => {
      const monthIndex = expense.month; // The month is already in the correct index format
      monthlyTotals[monthIndex] += expense.amounts; // Directly add the amounts since it's now a number
    });

    return monthlyTotals;
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Expenses',
        data: prices, // array of prices
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        stack: 'Stack 0',
      },
      // {
      //   label: 'Income',
      //   data: [28, 48, 40],
      //   backgroundColor: 'rgba(54, 162, 235, 0.2)',
      //   borderColor: 'rgb(54, 162, 235)',
      //   borderWidth: 1,
      //   stack: 'Stack 1',
      // },
      // {
      //   label: 'Dataset 3',
      //   data: [35, 72, 45],
      //   backgroundColor: 'rgba(75, 192, 192, 0.2)',
      //   borderColor: 'rgb(75, 192, 192)',
      //   borderWidth: 1,
      //   stack: 'Stack 1',
      // },
    ],
  };

  const options = {
    indexAxis: 'y',
    barThickness: 'flex',
    scales: {
      x: {
        beginAtZero: true,
        stacked: true, // Enable stacking for the x-axis
      },
      y: {
        stacked: true, // Enable stacking for the y-axis
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            // `context.raw` gives you the raw value
            const value = context.raw;
            return `$${value}`; 
          },
        },
      },
    },
  };

  return (
    <>
      <div className={c.container}>
        <h4>Services Costs</h4>
        <div className={c.graphicContainer}>
          <Bar data={data} options={options} className={c.bar}/>
        </div>
      </div>
    </>
  );
}
