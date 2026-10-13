import React from 'react';
import { AlertCircle, RotateCcw, SearchX, WifiOff } from 'lucide-react';

interface ErrorAlertProps {
  type: 'not_found' | 'network';
  message?: string;
  onRetry?: () => void;
  searchedCity?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  type,
  message,
  onRetry,
  searchedCity,
}) => {
  if (type === 'not_found') {
    return (
      <div className="max-w-2xl mx-auto my-8 p-6 sm:p-8 bg-amber-50/90 border border-amber-200/90 rounded-3xl text-center shadow-xs animate-fadeIn">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-inner">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          City Not Found
        </h3>
        <p className="text-sm text-slate-700 font-medium">
          City not found. Check the spelling and try again.
        </p>
        {searchedCity && (
          <p className="text-xs text-slate-500 mt-2">
            No geographic coordinates matched &ldquo;{searchedCity}&rdquo; in the Open-Meteo database.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 sm:p-8 bg-rose-50/90 border border-rose-200/90 rounded-3xl text-center shadow-xs animate-fadeIn">
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shadow-inner">
        <WifiOff className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">
        Communication Error
      </h3>
      <p className="text-sm text-slate-700 font-medium">
        {message || 'Failed to fetch weather data from Open-Meteo. Please check your network connection.'}
      </p>
      <p className="text-xs text-slate-500 mt-1 mb-5">
        The public Open-Meteo service may be temporarily unreachable or the request timed out.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold rounded-xl shadow-md shadow-rose-600/20 active:scale-98 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retry Request</span>
        </button>
      )}
    </div>
  );
};
