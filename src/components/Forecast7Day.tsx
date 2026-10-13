import React from 'react';
import { DayForecastItem } from '../types/weather';
import { getWmoWeatherInfo } from '../utils/wmoCodes';
import { WeatherIcon } from './WeatherIcon';
import {
  Droplets,
  SunMedium,
  Wind,
  Umbrella,
  Flame,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

interface Forecast7DayProps {
  forecast: DayForecastItem[];
  selectedIndex: number;
  onSelectDay: (index: number) => void;
  tempUnit: 'celsius' | 'fahrenheit';
}

export const Forecast7Day: React.FC<Forecast7DayProps> = ({
  forecast,
  selectedIndex,
  onSelectDay,
  tempUnit,
}) => {
  const formatTemp = (valCelsius: number) => {
    if (tempUnit === 'fahrenheit') {
      const f = (valCelsius * 9) / 5 + 32;
      return `${Math.round(f)}°`;
    }
    return `${Math.round(valCelsius)}°`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            7-Day Meteorological Outlook
          </h3>
          <p className="text-xs text-slate-500">
            Click any day to inspect its full deterministic activity advisory
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
          <span>Max Temp</span>
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block ml-2" />
          <span>Min Temp</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {forecast.map((day, idx) => {
          const wmo = getWmoWeatherInfo(day.weatherCode);
          const isSelected = selectedIndex === idx;
          const isToday = idx === 0;

          // Quick alerts
          const needsUmbrella = day.rainProb >= 60;
          const highHeat = day.tempMax >= 35;
          const highWind = day.windSpeedMax >= 40;
          const highUv = day.uvIndex >= 8;
          const isFavorable = !needsUmbrella && !highHeat && !highWind && !highUv;

          return (
            <button
              key={day.date}
              onClick={() => onSelectDay(idx)}
              className={`relative flex flex-col justify-between p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-sky-50/90 border-sky-500 shadow-md ring-2 ring-sky-400/30'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              {/* Day title & Tag */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      isToday
                        ? 'text-sky-600'
                        : isSelected
                        ? 'text-sky-800'
                        : 'text-slate-500'
                    }`}
                  >
                    {isToday ? 'Today' : day.dayOfWeek}
                  </span>
                  {isToday && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-md bg-sky-100 text-sky-700">
                      Now
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-700 font-medium">
                  {day.formattedDate}
                </div>

                {/* Weather icon & condition */}
                <div className="my-3 flex flex-col items-center">
                  <div className="p-2.5 rounded-xl bg-slate-100/80 text-slate-800 mb-1.5">
                    <WeatherIcon iconType={wmo.icon} className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-medium text-slate-700 text-center line-clamp-1">
                    {wmo.label}
                  </span>
                </div>

                {/* Temperature High / Low */}
                <div className="flex items-center justify-center space-x-2 my-2 py-1.5 px-2 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-base font-bold text-slate-900">
                    {formatTemp(day.tempMax)}
                  </span>
                  <span className="text-xs text-slate-400 font-light">/</span>
                  <span className="text-sm font-semibold text-slate-500">
                    {formatTemp(day.tempMin)}
                  </span>
                </div>

                {/* Micro metrics: Rain & UV */}
                <div className="space-y-1 pt-1 border-t border-slate-100 text-[11px] text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-1">
                      <Droplets className="w-3 h-3 text-sky-500" />
                      <span>Rain</span>
                    </span>
                    <span
                      className={`font-semibold ${
                        day.rainProb >= 60 ? 'text-blue-600 font-bold' : 'text-slate-700'
                      }`}
                    >
                      {day.rainProb}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-1">
                      <SunMedium className="w-3 h-3 text-amber-500" />
                      <span>UV</span>
                    </span>
                    <span
                      className={`font-semibold ${
                        day.uvIndex >= 8 ? 'text-amber-600 font-bold' : 'text-slate-700'
                      }`}
                    >
                      {day.uvIndex.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-1">
                      <Wind className="w-3 h-3 text-teal-500" />
                      <span>Wind</span>
                    </span>
                    <span
                      className={`font-semibold ${
                        day.windSpeedMax >= 40 ? 'text-rose-600 font-bold' : 'text-slate-700'
                      }`}
                    >
                      {Math.round(day.windSpeedMax)} km/h
                    </span>
                  </div>
                </div>
              </div>

              {/* Status pill based on rules */}
              <div className="mt-3 pt-2 border-t border-slate-100">
                {needsUmbrella ? (
                  <span className="inline-flex items-center text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-md w-full justify-center">
                    <Umbrella className="w-2.5 h-2.5 mr-1" />
                    Umbrella
                  </span>
                ) : highHeat ? (
                  <span className="inline-flex items-center text-[10px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded-md w-full justify-center">
                    <Flame className="w-2.5 h-2.5 mr-1" />
                    Heat alert
                  </span>
                ) : highWind ? (
                  <span className="inline-flex items-center text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-md w-full justify-center">
                    <Wind className="w-2.5 h-2.5 mr-1" />
                    High wind
                  </span>
                ) : highUv ? (
                  <span className="inline-flex items-center text-[10px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded-md w-full justify-center">
                    <SunMedium className="w-2.5 h-2.5 mr-1" />
                    High UV
                  </span>
                ) : (
                  <span className="inline-flex items-center text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md w-full justify-center">
                    <CheckCircle className="w-2.5 h-2.5 mr-1" />
                    Good day
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
