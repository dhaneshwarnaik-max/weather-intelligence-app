import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { DayForecastItem } from '../types/weather';
import { TrendingUp, CloudRain, BarChart3, LineChart as LineChartIcon } from 'lucide-react';

interface WeatherChartsProps {
  forecast: DayForecastItem[];
  tempUnit: 'celsius' | 'fahrenheit';
}

export const WeatherCharts: React.FC<WeatherChartsProps> = ({ forecast, tempUnit }) => {
  const [activeTab, setActiveTab] = useState<'both' | 'temp' | 'rain'>('both');

  const unitSymbol = tempUnit === 'fahrenheit' ? '°F' : '°C';

  // Format data for Recharts
  const chartData = forecast.map((day, idx) => {
    const rawMax = day.tempMax;
    const rawMin = day.tempMin;

    const maxTemp =
      tempUnit === 'fahrenheit'
        ? Math.round((rawMax * 9) / 5 + 32)
        : Math.round(rawMax);

    const minTemp =
      tempUnit === 'fahrenheit'
        ? Math.round((rawMin * 9) / 5 + 32)
        : Math.round(rawMin);

    return {
      day: idx === 0 ? 'Today' : day.dayOfWeek,
      fullDate: day.formattedDate,
      maxTemp,
      minTemp,
      rainProb: day.rainProb,
      windSpeed: Math.round(day.windSpeedMax),
      uvIndex: day.uvIndex,
    };
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-6">
      {/* Header and view selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center space-x-2 text-sky-600 mb-0.5">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Visual Intelligence
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            7-Day Meteorological Trends
          </h3>
        </div>

        {/* View toggle tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'both'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Charts
          </button>
          <button
            onClick={() => setActiveTab('temp')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1 ${
              activeTab === 'temp'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LineChartIcon className="w-3.5 h-3.5 text-rose-500" />
            <span>Temperature</span>
          </button>
          <button
            onClick={() => setActiveTab('rain')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1 ${
              activeTab === 'rain'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5 text-blue-500" />
            <span>Rain Probability</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Line Chart for Max / Min Temperature */}
        {(activeTab === 'both' || activeTab === 'temp') && (
          <div
            className={`space-y-3 ${
              activeTab === 'temp' ? 'lg:col-span-2' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="p-1 rounded-md bg-rose-50 text-rose-600">
                  <LineChartIcon className="w-4 h-4" />
                </span>
                <h4 className="text-sm font-bold text-slate-800">
                  Temperature Range ({unitSymbol})
                </h4>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <span className="inline-flex items-center text-rose-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-1.5" />
                  Max
                </span>
                <span className="inline-flex items-center text-sky-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 mr-1.5" />
                  Min
                </span>
              </div>
            </div>

            <div className="w-full h-64 sm:h-72 bg-slate-50/60 rounded-2xl p-2 sm:p-4 border border-slate-100">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 15, right: 15, left: -15, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    stroke="#cbd5e1"
                    tickLine={false}
                  />
                  <YAxis
                    unit={unitSymbol}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    stroke="#cbd5e1"
                    tickLine={false}
                    domain={['auto', 'auto']}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '12px',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                    }}
                    formatter={(value: any, name: any) => [
                      `${value}${unitSymbol}`,
                      name === 'maxTemp' ? 'Max Temp' : 'Min Temp',
                    ]}
                    labelFormatter={(label, items) => {
                      const item = items[0]?.payload;
                      return item ? `${label} (${item.fullDate})` : label;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="maxTemp"
                    name="Max Temperature"
                    stroke="#f43f5e"
                    strokeWidth={3}
                    dot={{ fill: '#f43f5e', r: 4, strokeWidth: 2, stroke: '#ffffff' }}
                    activeDot={{ r: 6, fill: '#f43f5e' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="minTemp"
                    name="Min Temperature"
                    stroke="#0284c7"
                    strokeWidth={3}
                    dot={{ fill: '#0284c7', r: 4, strokeWidth: 2, stroke: '#ffffff' }}
                    activeDot={{ r: 6, fill: '#0284c7' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-500 text-center">
              Daily temperature curves showing expected diurnal thermal extremes
            </p>
          </div>
        )}

        {/* Chart 2: Bar Chart for Rain Probability */}
        {(activeTab === 'both' || activeTab === 'rain') && (
          <div
            className={`space-y-3 ${
              activeTab === 'rain' ? 'lg:col-span-2' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="p-1 rounded-md bg-blue-50 text-blue-600">
                  <BarChart3 className="w-4 h-4" />
                </span>
                <h4 className="text-sm font-bold text-slate-800">
                  Rain Probability (%)
                </h4>
              </div>
              <div className="flex items-center space-x-2 text-xs text-blue-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" />
                <span>Precipitation Risk</span>
              </div>
            </div>

            <div className="w-full h-64 sm:h-72 bg-slate-50/60 rounded-2xl p-2 sm:p-4 border border-slate-100">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 15, right: 15, left: -15, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    stroke="#cbd5e1"
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    unit="%"
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    stroke="#cbd5e1"
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '12px',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                    }}
                    formatter={(value: any) => [`${value}%`, 'Rain Probability']}
                    labelFormatter={(label, items) => {
                      const item = items[0]?.payload;
                      return item ? `${label} (${item.fullDate})` : label;
                    }}
                  />
                  <ReferenceLine
                    y={60}
                    stroke="#dc2626"
                    strokeDasharray="4 4"
                    label={{
                      value: '60% Umbrella Trigger',
                      position: 'top',
                      fill: '#dc2626',
                      fontSize: 10,
                      fontWeight: 600,
                    }}
                  />
                  <Bar
                    dataKey="rainProb"
                    name="Rain Probability"
                    fill="#3b82f6"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-500 text-center">
              Dotted red line at 60% denotes the threshold for mandatory umbrella & outdoor rescheduling
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
