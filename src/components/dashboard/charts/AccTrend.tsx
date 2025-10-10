import {Line} from 'react-chartjs-2';
import {Chart as ChartJS,
        CategoryScale, 
        LinearScale, 
        PointElement, 
        LineElement,
        Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,
    Title, Tooltip, Legend
);

import getAccTrendData from'./data/AccTrendData';

import { useState, useEffect } from 'react';
import { supabase } from '../../../client';

export default function AccTrend() {
    const [chartData, setChartData] = useState({ labels: [], values: [] });

    // auth for user
    const fetchData = async () => {
            // get the current user
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (user) {
                // fetch the trend data
                const trendData: any = await getAccTrendData(user.id);

                setChartData(trendData);
            }
            if(userError){
                console.error('Error fetching user:', userError);
            }
    }

    // Auto-refresh every 1 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchData(); 
        }, 1000); // 1 second

        return () => clearInterval(interval);
    }, []);  

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Account Balance',
                data: chartData.values,
                fill: true,
                borderColor: '#9333ea',
                borderWidth: 3,
                pointBackgroundColor: '#9333ea',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                tension: 0.4
            }
        ]
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
                backgroundColor: 'rgba(147, 51, 234, 0.9)',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: '#a855f7',
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12
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
                    <h3 className="text-base font-bold text-gray-800">Account Trends</h3>
                    <p className="text-xs text-gray-600">7-day overview</p>
                </div>
            </div>

            {/* Chart Container */}
            <div className="w-full">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}