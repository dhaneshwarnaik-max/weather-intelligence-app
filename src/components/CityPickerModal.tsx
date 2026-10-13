import React from 'react';
import { GeocodingResult } from '../types/weather';
import { MapPin, Navigation, Globe, X } from 'lucide-react';

interface CityPickerModalProps {
  results: GeocodingResult[];
  searchTerm: string;
  onSelect: (result: GeocodingResult) => void;
  onClose: () => void;
}

export const CityPickerModal: React.FC<CityPickerModalProps> = ({
  results,
  searchTerm,
  onSelect,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col max-h-[85vh] animate-scaleUp">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center space-x-2 text-sky-600 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Multiple Locations Found
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Select Your Target Location
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Found {results.length} matching places for &ldquo;{searchTerm}&rdquo;
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of matches */}
        <div className="p-3 sm:p-4 overflow-y-auto divide-y divide-slate-100">
          {results.map((item) => (
            <button
              key={`${item.id}-${item.latitude}-${item.longitude}`}
              onClick={() => onSelect(item)}
              className="w-full text-left py-3 px-3 sm:px-4 rounded-xl hover:bg-sky-50/70 border border-transparent hover:border-sky-200 transition-all group flex items-center justify-between cursor-pointer"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-base font-semibold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {item.name}
                  </span>
                  {item.country_code && (
                    <span className="px-1.5 py-0.5 text-xs font-medium rounded-md bg-slate-100 text-slate-600 border border-slate-200 uppercase">
                      {item.country_code}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center text-xs text-slate-600 space-x-2">
                  {item.admin1 && (
                    <span className="font-medium text-slate-700">
                      State / Region: <span className="text-slate-900 font-semibold">{item.admin1}</span>
                    </span>
                  )}
                  {item.admin1 && item.country && <span className="text-slate-300">•</span>}
                  {item.country && (
                    <span className="text-slate-600">
                      Country: <span className="text-slate-800 font-medium">{item.country}</span>
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-slate-400 flex items-center space-x-3 pt-0.5">
                  <span className="flex items-center space-x-1">
                    <Navigation className="w-3 h-3 text-slate-400" />
                    <span>
                      {item.latitude.toFixed(2)}°N, {item.longitude.toFixed(2)}°E
                    </span>
                  </span>
                  {item.elevation !== undefined && (
                    <span>Elevation: {Math.round(item.elevation)}m</span>
                  )}
                </div>
              </div>

              <div className="ml-3 flex-shrink-0 text-slate-400 group-hover:text-sky-600 transition-colors">
                <div className="px-3 py-1.5 rounded-lg bg-slate-100 group-hover:bg-sky-600 group-hover:text-white text-xs font-semibold transition-all">
                  Select
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
