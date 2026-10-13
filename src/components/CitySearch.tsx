import React, { useState } from 'react';
import { Search, MapPin, AlertCircle, Sparkles } from 'lucide-react';

interface CitySearchProps {
  onSearch: (cityName: string) => void;
  isLoading: boolean;
  selectedCityName?: string;
}

const POPULAR_CITIES = [
  { name: 'Tokyo', country: 'Japan' },
  { name: 'London', country: 'United Kingdom' },
  { name: 'New York', country: 'United States' },
  { name: 'Paris', country: 'France' },
  { name: 'Sydney', country: 'Australia' },
  { name: 'Singapore', country: 'Singapore' },
  { name: 'Dubai', country: 'United Arab Emirates' },
  { name: 'Mumbai', country: 'India' },
];

export const CitySearch: React.FC<CitySearchProps> = ({
  onSearch,
  isLoading,
  selectedCityName,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();

    if (!trimmed) {
      setValidationError('Please enter a city name to search.');
      return;
    }

    setValidationError(null);
    onSearch(trimmed);
  };

  const handleQuickCityClick = (cityName: string) => {
    setInputValue(cityName);
    setValidationError(null);
    onSearch(cityName);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="Search any global city (e.g., Tokyo, London, Berlin, Austin)..."
              disabled={isLoading}
              className={`w-full pl-10 pr-4 py-3 bg-white border ${
                validationError
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-sky-500 focus:ring-sky-100'
              } rounded-xl text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-hidden focus:ring-4 transition-all shadow-xs`}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-medium text-sm sm:text-base rounded-xl transition-all shadow-md shadow-sky-600/20 active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Searching...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1.5">
                <Search className="w-4 h-4" />
                <span>Search</span>
              </span>
            )}
          </button>
        </div>

        {/* Validation error message */}
        {validationError && (
          <div className="mt-2 flex items-center space-x-1.5 text-xs sm:text-sm text-rose-600 font-medium animate-fadeIn">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{validationError}</span>
          </div>
        )}
      </form>

      {/* Quick Select Cities */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
        <span className="text-xs text-slate-500 font-medium flex items-center mr-1">
          <Sparkles className="w-3 h-3 text-amber-500 mr-1" />
          Popular:
        </span>
        {POPULAR_CITIES.map((city) => (
          <button
            key={city.name}
            onClick={() => handleQuickCityClick(city.name)}
            disabled={isLoading}
            className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
              selectedCityName?.toLowerCase() === city.name.toLowerCase()
                ? 'bg-sky-50 text-sky-700 border-sky-300 font-semibold shadow-xs'
                : 'bg-white/80 hover:bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200'
            }`}
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
};
