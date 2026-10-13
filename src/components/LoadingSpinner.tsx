import React from 'react';
import { CloudRain } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Retrieving atmospheric telemetry from Open-Meteo...',
}) => {
  return (
    <div className="py-16 sm:py-24 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-sky-100 border-t-sky-600 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-sky-600">
          <CloudRain className="w-6 h-6 animate-pulse" />
        </div>
      </div>
      <div className="space-y-1">
        <h4 className="text-base font-bold text-slate-800 tracking-tight">
          Loading Meteorological Data
        </h4>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
          {message}
        </p>
      </div>
    </div>
  );
};
