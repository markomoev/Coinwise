import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// import the data
import IncVSExpData from './data/IncVSExpData';

import { useState, useEffect } from 'react';
import { supabase } from '../../../client';

export default function IncomeVSExpenses() {
    const [chartData, setChartData] = useState({ labels: [], values: [] });


        const fetchData = async () => {
            try{
                // get the current user
                const { data: { user } } = await supabase.auth.getUser();
                
                if(user){
                    // fetch the trend data
                    const trendData: any = await IncVSExpData(user.id);

                    setChartData(trendData);
                }
            }
            catch(error){
                console.error('Error fetching user or trend data:', error);
            }
        }

    // Auto-refresh every 1 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchData(); 
        }, 1000); // 1 second

        return () => clearInterval(interval);
    }, []);  

    // chart info
    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Amount',
                data: chartData.values,
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)', // Green for income
                    'rgba(239, 68, 68, 0.8)', // Red for expenses
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(239, 68, 68, 1)',
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: '#374151',
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12,
                callbacks: {
                    label: function(context: any) {
                        return `${context.label}: $${context.parsed.y.toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#000000',
                    font: {
                        size: 12,
                        family: 'Montserrat'
                    }
                }
            },
            y: {
                display: false
            }
        }
    };


    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div>
                    <h3 className="text-base font-bold text-gray-800">Income vs Expenses</h3>
                    <p className="text-xs text-gray-600">Current month comparison</p>
                </div>
            </div>

            {/* Chart Container */}
            <div className="w-full">
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}