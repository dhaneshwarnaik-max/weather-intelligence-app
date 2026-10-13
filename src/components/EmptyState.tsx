import React from 'react';
import {
  CloudSun,
  ShieldCheck,
  TrendingUp,
  Umbrella,
  Compass,
  ArrowRight,
  Flame,
  Wind,
} from 'lucide-react';

interface EmptyStateProps {
  onSelectCity: (cityName: string) => void;
}

const FEATURE_HIGHLIGHTS = [
  {
    icon: <CloudSun className="w-5 h-5 text-sky-500" />,
    title: 'Live Open-Meteo Data',
    desc: 'Direct browser queries to Open-Meteo public endpoints with zero API keys or backend intermediaries.',
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-indigo-500" />,
    title: 'Interactive 7-Day Visuals',
    desc: 'High-precision temperature curves and precipitation probability charts powered by Recharts.',
  },
  {
    icon: <Umbrella className="w-5 h-5 text-amber-500" />,
    title: 'Deterministic Planning',
    desc: 'Rule-based advisories for umbrellas (≥60%), extreme heat (≥35°C), high UV (≥8), and two-wheelers (≥40 km/h).',
  },
];

const SUGGESTED_CITIES = [
  { name: 'Tokyo', desc: 'Japan • Megacity with dynamic climate' },
  { name: 'Paris', desc: 'France • Temperate oceanic conditions' },
  { name: 'New York', desc: 'USA • Continental coastal seasons' },
  { name: 'Sydney', desc: 'Australia • Southern hemisphere coastal' },
];

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectCity }) => {
  return (
    <div className="py-10 sm:py-16 text-center max-w-4xl mx-auto space-y-10 animate-fadeIn">
      {/* Hero Badge & Icon */}
      <div className="space-y-4">
        <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-gradient-to-tr from-sky-500/10 via-indigo-500/10 to-purple-500/10 border border-sky-100 shadow-inner">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25">
            <Compass className="w-9 h-9" />
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Precision Meteorological Intelligence
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Search any city above to view real-time atmospheric metrics, 7-day diurnal temperature trends, precipitation probability bars, and deterministic activity planning alerts.
        </p>
      </div>

      {/* Suggested Starting Destinations */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Try One Of These Sample Cities
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {SUGGESTED_CITIES.map((c) => (
            <button
              key={c.name}
              onClick={() => onSelectCity(c.name)}
              className="group p-4 bg-white rounded-2xl border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors flex items-center justify-between">
                  <span>{c.name}</span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs text-slate-500 mt-1 line-clamp-1">{c.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Core Architectural Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 text-left">
        {FEATURE_HIGHLIGHTS.map((f, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2"
          >
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 w-fit">
              {f.icon}
            </div>
            <h3 className="text-sm font-bold text-slate-900">{f.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
