import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { supabase } from '../../../client';
import ChartBreakData from './data/ChartBreakData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ChartBreak() {
  const [chartData, setChartData] = useState<{ labels: string[]; values: number[] }>({
    labels: [],
    values: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setChartData({ labels: [], values: [] });
        return;
      }

      const data = await ChartBreakData(user.id);
      setChartData({
        labels: Array.isArray(data?.labels) ? data.labels : [],
        values: Array.isArray(data?.values) ? (data.values as number[]) : [],
      });
    } catch (e) {
      console.error('ChartBreak fetch error:', e);
      setChartData({ labels: [], values: [] });
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh data
  useEffect(() => {
    fetchData(); 
    const id = setInterval(fetchData, 1000); // refresh every 1s
    return () => clearInterval(id);
  }, []);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Savings Balance',
        data: chartData.values,
        fill: true,
        backgroundColor: 'rgba(34, 197, 94, 0.12)', // green-500 @ 12%
        borderColor: '#22c55e',
        borderWidth: 2.5,
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.35,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(34, 197, 94, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#16a34a',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: (ctx: any) => `Savings: $${(ctx.parsed?.y ?? 0).toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#111827',
          font: { size: 12, family: 'Montserrat' },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 7,
        },
      },
      y: { display: false },
    },
  } as const;

  const current = chartData.values.at(-1) ?? 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 h-[360px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-800">Savings Growth</h3>
          <p className="text-xs text-gray-600">Recent trend</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-xs text-green-600 font-medium">Growing</span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full flex-1 relative overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">Loading…</div>
        ) : chartData.values.length > 0 ? (
          <div className="h-full w-full">
            <Line data={data} options={options} />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">No savings data yet</div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-xs text-gray-500">Current</p>
            <p className="text-sm font-semibold text-green-600">
              ${current.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Goal Progress</p>
            <p className="text-sm font-semibold text-gray-700">—</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">This Week</p>
            <p className="text-sm font-semibold text-green-600">—</p>
          </div>
        </div>
      </div>
    </div>
  );
}