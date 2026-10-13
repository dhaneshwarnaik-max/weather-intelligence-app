import React from 'react';
import { Compass, CloudSun, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  tempUnit: 'celsius' | 'fahrenheit';
  onToggleUnit: (unit: 'celsius' | 'fahrenheit') => void;
}

export const Header: React.FC<HeaderProps> = ({ tempUnit, onToggleUnit }) => {
  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
            <CloudSun className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                Weather Intelligence
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                Open-Meteo Live
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Deterministic Activity Advisory & 7-Day Forecast Engine
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Temperature unit switch */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-medium">
            <button
              onClick={() => onToggleUnit('celsius')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                tempUnit === 'celsius'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Celsius (°C)"
            >
              °C
            </button>
            <button
              onClick={() => onToggleUnit('fahrenheit')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                tempUnit === 'fahrenheit'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Fahrenheit (°F)"
            >
              °F
            </button>
          </div>

          <div className="hidden md:flex items-center text-xs text-slate-500 space-x-1 pl-2 border-l border-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Pure Browser Client</span>
          </div>
        </div>
      </div>
    </header>
  );
};
