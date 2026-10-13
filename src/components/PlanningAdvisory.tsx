import React from 'react';
import { DayForecastItem, DayPlanningAdvisory } from '../types/weather';
import { evaluatePlanningRules } from '../utils/recommendations';
import {
  Umbrella,
  Flame,
  SunMedium,
  Wind,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Bike,
  Briefcase,
  Sparkles,
  CalendarDays,
  Info,
} from 'lucide-react';

interface PlanningAdvisoryProps {
  forecast: DayForecastItem[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  tempUnit: 'celsius' | 'fahrenheit';
}

export const PlanningAdvisory: React.FC<PlanningAdvisoryProps> = ({
  forecast,
  selectedIndex,
  onSelectIndex,
  tempUnit,
}) => {
  const currentDayItem = forecast[selectedIndex] || forecast[0];
  const advisory: DayPlanningAdvisory = evaluatePlanningRules(currentDayItem, selectedIndex);

  const formatTemp = (valCelsius: number) => {
    if (tempUnit === 'fahrenheit') {
      const f = (valCelsius * 9) / 5 + 32;
      return `${Math.round(f)}°F`;
    }
    return `${Math.round(valCelsius)}°C`;
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 mb-0.5">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Deterministic Advisory Engine
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Outdoor & Activity Planning Recommendations
          </h3>
          <p className="text-xs text-slate-500">
            Automated rule-based meteorological decisions evaluated with zero AI hallucination
          </p>
        </div>

        {/* Day selection tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 max-w-full">
          {forecast.map((f, i) => (
            <button
              key={f.date}
              onClick={() => onSelectIndex(i)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedIndex === i
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {i === 0 ? 'Today' : f.dayOfWeek}
            </button>
          ))}
        </div>
      </div>

      {/* Main recommendation banner */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          advisory.overallStatus === 'adverse'
            ? 'bg-rose-50/80 border-rose-200 text-rose-950'
            : advisory.overallStatus === 'caution'
            ? 'bg-amber-50/80 border-amber-200 text-amber-950'
            : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-white/80 border shadow-2xs">
                {advisory.isToday ? 'Today’s Recommendation' : `${advisory.dayOfWeek} (${advisory.formattedDate})`}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  advisory.overallStatus === 'adverse'
                    ? 'bg-rose-200 text-rose-800'
                    : advisory.overallStatus === 'caution'
                    ? 'bg-amber-200 text-amber-800'
                    : 'bg-emerald-200 text-emerald-800'
                }`}
              >
                {advisory.overallStatus === 'adverse'
                  ? 'High Advisory'
                  : advisory.overallStatus === 'caution'
                  ? 'Advisory Notice'
                  : 'Optimal Conditions'}
              </span>
            </div>

            <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {advisory.primaryRecommendation}
            </h4>

            <p className="text-xs sm:text-sm text-slate-700 max-w-3xl">
              {advisory.alerts.map((a) => a.description).join(' ')}
            </p>
          </div>

          {/* Quick weather snapshot for this selected day */}
          <div className="flex-shrink-0 bg-white/90 p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-1.5 min-w-[200px]">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">
              Day Conditions
            </div>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-slate-600">High / Low:</span>
              <span className="font-bold text-slate-900">
                {formatTemp(currentDayItem.tempMax)} / {formatTemp(currentDayItem.tempMin)}
              </span>
            </div>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-slate-600">Rain Prob:</span>
              <span
                className={`font-bold ${
                  currentDayItem.rainProb >= 60 ? 'text-blue-600' : 'text-slate-900'
                }`}
              >
                {currentDayItem.rainProb}%
              </span>
            </div>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-slate-600">Peak Wind:</span>
              <span
                className={`font-bold ${
                  currentDayItem.windSpeedMax >= 40 ? 'text-amber-600' : 'text-slate-900'
                }`}
              >
                {Math.round(currentDayItem.windSpeedMax)} km/h
              </span>
            </div>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-slate-600">Max UV Index:</span>
              <span
                className={`font-bold ${
                  currentDayItem.uvIndex >= 8 ? 'text-purple-600' : 'text-slate-900'
                }`}
              >
                {currentDayItem.uvIndex.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Deterministic Rule Triggers Breakdown */}
      <div>
        <div className="flex items-center space-x-1.5 mb-3 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Info className="w-3.5 h-3.5 text-slate-500" />
          <span>Rule Triggers & Verification</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Rule 1: Rain Probability */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              currentDayItem.rainProb >= 60
                ? 'bg-blue-50 border-blue-300'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span
                  className={`p-1.5 rounded-lg ${
                    currentDayItem.rainProb >= 60
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <Umbrella className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-slate-900">Rain Rule</span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  currentDayItem.rainProb >= 60
                    ? 'bg-blue-200 text-blue-900'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {currentDayItem.rainProb >= 60 ? 'Triggered' : 'Normal'}
              </span>
            </div>
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-900">
                {currentDayItem.rainProb}% Probability
              </span>{' '}
              (Threshold: ≥60%)
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {currentDayItem.rainProb >= 60
                ? 'Carry umbrella / reschedule outdoor plans'
                : 'Low precipitation chance'}
            </p>
          </div>

          {/* Rule 2: Max Temperature */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              currentDayItem.tempMax >= 35
                ? 'bg-rose-50 border-rose-300'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span
                  className={`p-1.5 rounded-lg ${
                    currentDayItem.tempMax >= 35
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <Flame className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-slate-900">Heat Rule</span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  currentDayItem.tempMax >= 35
                    ? 'bg-rose-200 text-rose-900'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {currentDayItem.tempMax >= 35 ? 'Triggered' : 'Normal'}
              </span>
            </div>
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-900">
                {currentDayItem.tempMax.toFixed(1)}°C Max
              </span>{' '}
              (Threshold: ≥35°C)
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {currentDayItem.tempMax >= 35
                ? 'Avoid midday outdoor work'
                : 'Safe thermal conditions'}
            </p>
          </div>

          {/* Rule 3: UV Index */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              currentDayItem.uvIndex >= 8
                ? 'bg-purple-50 border-purple-300'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span
                  className={`p-1.5 rounded-lg ${
                    currentDayItem.uvIndex >= 8
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <SunMedium className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-slate-900">UV Rule</span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  currentDayItem.uvIndex >= 8
                    ? 'bg-purple-200 text-purple-900'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {currentDayItem.uvIndex >= 8 ? 'Triggered' : 'Normal'}
              </span>
            </div>
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-900">
                Index {currentDayItem.uvIndex.toFixed(1)}
              </span>{' '}
              (Threshold: ≥8)
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {currentDayItem.uvIndex >= 8
                ? 'Use sun protection'
                : 'Moderate or mild solar radiation'}
            </p>
          </div>

          {/* Rule 4: Wind Speed */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              currentDayItem.windSpeedMax >= 40
                ? 'bg-amber-50 border-amber-300'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span
                  className={`p-1.5 rounded-lg ${
                    currentDayItem.windSpeedMax >= 40
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <Wind className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-slate-900">Wind Rule</span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  currentDayItem.windSpeedMax >= 40
                    ? 'bg-amber-200 text-amber-900'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {currentDayItem.windSpeedMax >= 40 ? 'Triggered' : 'Normal'}
              </span>
            </div>
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-900">
                {currentDayItem.windSpeedMax.toFixed(1)} km/h
              </span>{' '}
              (Threshold: ≥40 km/h)
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {currentDayItem.windSpeedMax >= 40
                ? 'Caution for two-wheeler travel'
                : 'Gentle to moderate airflow'}
            </p>
          </div>
        </div>
      </div>

      {/* Practical Action Matrix for daily activities */}
      <div className="pt-2 border-t border-slate-100">
        <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Activity Suitability & Action Checklist
        </h5>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2.5">
            <span
              className={`p-1 rounded-md ${
                advisory.suitability.outdoorActivities
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              {advisory.suitability.outdoorActivities ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <AlertTriangle className="w-4 h-4" />
              )}
            </span>
            <div>
              <div className="text-xs font-bold text-slate-900">Outdoor Plans</div>
              <div className="text-[11px] text-slate-500">
                {advisory.suitability.outdoorActivities ? 'Recommended' : 'Reschedule or indoors'}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2.5">
            <span
              className={`p-1 rounded-md ${
                advisory.suitability.twoWheelerCommute
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              <Bike className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs font-bold text-slate-900">Two-Wheelers</div>
              <div className="text-[11px] text-slate-500">
                {advisory.suitability.twoWheelerCommute ? 'Safe travel' : 'Caution: wind gusts / rain'}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2.5">
            <span
              className={`p-1 rounded-md ${
                advisory.suitability.middayWorkSafe
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              <Briefcase className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs font-bold text-slate-900">Midday Outdoor Work</div>
              <div className="text-[11px] text-slate-500">
                {advisory.suitability.middayWorkSafe ? 'Normal' : 'Avoid peak noon hours'}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2.5">
            <span
              className={`p-1 rounded-md ${
                advisory.suitability.sunscreenNeeded
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              <SunMedium className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs font-bold text-slate-900">Sun Protection</div>
              <div className="text-[11px] text-slate-500">
                {advisory.suitability.sunscreenNeeded ? 'SPF 50+ & hat required' : 'Low risk'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
