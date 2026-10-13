import React from 'react';
import { CurrentWeatherData, GeocodingResult } from '../types/weather';
import { getWmoWeatherInfo } from '../utils/wmoCodes';
import { WeatherIcon } from './WeatherIcon';
import {
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  MapPin,
  Calendar,
  Clock,
  ArrowUpRight,
} from 'lucide-react';

interface CurrentWeatherCardProps {
  current: CurrentWeatherData;
  city: GeocodingResult;
  tempUnit: 'celsius' | 'fahrenheit';
  timezone?: string;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  current,
  city,
  tempUnit,
  timezone,
}) => {
  const wmo = getWmoWeatherInfo(current.weather_code);

  const formatTemp = (valCelsius: number) => {
    if (tempUnit === 'fahrenheit') {
      const f = (valCelsius * 9) / 5 + 32;
      return `${Math.round(f)}°F`;
    }
    return `${Math.round(valCelsius)}°C`;
  };

  // Format local observation time
  const observationTime = new Date(current.time);
  const formattedTime = observationTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone,
  });

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white shadow-xl p-6 sm:p-8 border border-slate-700/60">
      {/* Background ambient meteorological glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Location & Time Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-700/50 gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="p-1 rounded-md bg-sky-500/20 text-sky-300">
                <MapPin className="w-4 h-4" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {city.name}
              </h2>
              {city.country_code && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-700/80 text-slate-300 border border-slate-600">
                  {city.country_code}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-300 font-medium pl-7">
              {[city.admin1, city.country].filter(Boolean).join(', ')}
            </p>
          </div>

          <div className="flex items-center space-x-4 text-xs text-slate-400">
            <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Local Time: {formattedTime}</span>
            </div>
            {timezone && (
              <span className="hidden md:inline-block text-[11px] text-slate-400">
                {timezone}
              </span>
            )}
          </div>
        </div>

        {/* Main Temperature and Condition Display */}
        <div className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Temperature and Icon */}
          <div className="md:col-span-7 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 shadow-inner">
                <WeatherIcon iconType={wmo.icon} className="w-16 h-16 sm:w-20 sm:h-20" />
              </div>
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-6xl sm:text-7xl font-black tracking-tighter text-white">
                    {formatTemp(current.temperature_2m)}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-300 mt-1">
                  <Thermometer className="w-4 h-4 text-sky-400" />
                  <span>
                    Feels like{' '}
                    <strong className="text-white font-semibold">
                      {formatTemp(current.apparent_temperature)}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="sm:border-l sm:border-slate-700/60 sm:pl-6 space-y-1">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-sky-500/20 text-sky-200 border border-sky-400/30">
                {wmo.label}
              </span>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xs">
                {wmo.description}
              </p>
            </div>
          </div>

          {/* Meteorological Key Metrics Grid */}
          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            {/* Humidity */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5 hover:bg-slate-800 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Humidity</span>
                <Droplets className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-xl font-bold text-white">
                {current.relative_humidity_2m}%
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {current.relative_humidity_2m > 70
                  ? 'High humidity'
                  : current.relative_humidity_2m < 30
                  ? 'Dry air'
                  : 'Comfortable'}
              </div>
            </div>

            {/* Wind Speed */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5 hover:bg-slate-800 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Wind Speed</span>
                <Wind className="w-4 h-4 text-teal-400" />
              </div>
              <div className="text-xl font-bold text-white">
                {current.wind_speed_10m}{' '}
                <span className="text-xs font-normal text-slate-300">km/h</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {current.wind_speed_10m >= 40
                  ? 'Strong winds'
                  : current.wind_speed_10m >= 20
                  ? 'Moderate breeze'
                  : 'Light air'}
              </div>
            </div>

            {/* Precipitation */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5 hover:bg-slate-800 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Precipitation</span>
                <CloudRain className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-xl font-bold text-white">
                {current.precipitation}{' '}
                <span className="text-xs font-normal text-slate-300">mm</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {current.precipitation > 0 ? 'Active moisture' : 'No rain observed'}
              </div>
            </div>

            {/* Apparent Temp Diff */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5 hover:bg-slate-800 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Heat Index</span>
                <Thermometer className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-xl font-bold text-white">
                {formatTemp(current.apparent_temperature)}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {Math.abs(current.apparent_temperature - current.temperature_2m) <= 1
                  ? 'True to gauge'
                  : current.apparent_temperature > current.temperature_2m
                  ? 'Feels warmer'
                  : 'Feels cooler'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
