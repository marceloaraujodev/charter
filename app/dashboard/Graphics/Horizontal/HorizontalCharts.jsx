import { Bar } from 'react-chartjs-2';
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
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const { serviceData } = useGlobalContext();

  const prices = serviceData.map(service => service.price)

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
