/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  GeocodingResponse,
  GeocodingResult,
  WeatherApiResponse,
  DayForecastItem,
} from './types/weather';
import { Header } from './components/Header';
import { CitySearch } from './components/CitySearch';
import { CityPickerModal } from './components/CityPickerModal';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { Forecast7Day } from './components/Forecast7Day';
import { WeatherCharts } from './components/WeatherCharts';
import { PlanningAdvisory } from './components/PlanningAdvisory';
import { EmptyState } from './components/EmptyState';
import { ErrorAlert } from './components/ErrorAlert';
import { LoadingSpinner } from './components/LoadingSpinner';

export default function App() {
  const [tempUnit, setTempUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  // Selected City & Weather State
  const [selectedCity, setSelectedCity] = useState<GeocodingResult | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(null);
  const [forecastItems, setForecastItems] = useState<DayForecastItem[]>([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  // Search Results & Modal State
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [lastSearchedTerm, setLastSearchedTerm] = useState<string>('');

  // Error States
  const [errorState, setErrorState] = useState<{
    type: 'not_found' | 'network';
    message?: string;
  } | null>(null);

  // Last action for retry
  const [lastAction, setLastAction] = useState<(() => void) | null>(null);

  // 1. Search City using Open-Meteo Geocoding
  const handleSearchCity = async (cityName: string) => {
    setIsLoading(true);
    setLoadingMessage(`Searching geocoding coordinates for "${cityName}"...`);
    setErrorState(null);
    setLastSearchedTerm(cityName);
    setLastAction(() => () => handleSearchCity(cityName));

    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        cityName
      )}&count=5&language=en&format=json`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Geocoding server responded with HTTP ${response.status}`);
      }

      const data: GeocodingResponse = await response.json();

      // Rule: If "results" is missing or empty, show "City not found. Check the spelling and try again."
      if (!data.results || data.results.length === 0) {
        setErrorState({ type: 'not_found' });
        setSelectedCity(null);
        setWeatherData(null);
        setForecastItems([]);
        setIsLoading(false);
        return;
      }

      // If single match, fetch weather directly
      if (data.results.length === 1) {
        await handleSelectCity(data.results[0]);
      } else {
        // If multiple matches, show picker with name, admin1 and country
        setSearchResults(data.results);
        setIsPickerOpen(true);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error('Error during geocoding search:', err);
      setErrorState({
        type: 'network',
        message: err.message || 'Unable to communicate with the Open-Meteo geocoding service.',
      });
      setIsLoading(false);
    }
  };

  // 2. Fetch Weather for Selected City
  const handleSelectCity = async (city: GeocodingResult) => {
    setIsPickerOpen(false);
    setSelectedCity(city);
    setIsLoading(true);
    setLoadingMessage(`Fetching 7-day meteorological forecast for ${city.name}...`);
    setErrorState(null);
    setSelectedDayIndex(0);
    setLastAction(() => () => handleSelectCity(city));

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,wind_speed_10m_max&timezone=auto&forecast_days=7`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Forecast server responded with HTTP ${response.status}`);
      }

      const data: WeatherApiResponse = await response.json();
      setWeatherData(data);

      // Parse 7-day items
      if (data.daily && data.daily.time) {
        const items: DayForecastItem[] = data.daily.time.map((dateStr, idx) => {
          const d = new Date(dateStr + 'T00:00:00');
          const dayOfWeek = d.toLocaleDateString('en-US', { weekday: 'short' });
          const formattedDate = d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });

          return {
            date: dateStr,
            formattedDate,
            dayOfWeek,
            weatherCode: data.daily.weather_code[idx] ?? 0,
            tempMax: data.daily.temperature_2m_max[idx] ?? 0,
            tempMin: data.daily.temperature_2m_min[idx] ?? 0,
            rainProb: data.daily.precipitation_probability_max[idx] ?? 0,
            uvIndex: data.daily.uv_index_max[idx] ?? 0,
            windSpeedMax: data.daily.wind_speed_10m_max[idx] ?? 0,
          };
        });
        setForecastItems(items);
      }
    } catch (err: any) {
      console.error('Error fetching weather data:', err);
      setErrorState({
        type: 'network',
        message: err.message || 'Unable to retrieve weather telemetry from Open-Meteo.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastAction) {
      lastAction();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-200/40 text-slate-900 flex flex-col font-sans">
      {/* Header */}
      <Header tempUnit={tempUnit} onToggleUnit={setTempUnit} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* City Search Bar & Popular Pills */}
        <section className="bg-white/80 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
          <CitySearch
            onSearch={handleSearchCity}
            isLoading={isLoading}
            selectedCityName={selectedCity?.name}
          />
        </section>

        {/* Loading Spinner State */}
        {isLoading && <LoadingSpinner message={loadingMessage} />}

        {/* Error States: City Not Found or Network Error */}
        {!isLoading && errorState && (
          <ErrorAlert
            type={errorState.type}
            message={errorState.message}
            onRetry={handleRetry}
            searchedCity={lastSearchedTerm}
          />
        )}

        {/* Empty State before first successful search */}
        {!isLoading && !errorState && !weatherData && (
          <EmptyState onSelectCity={handleSearchCity} />
        )}

        {/* Active Weather Dashboard */}
        {!isLoading && !errorState && weatherData && selectedCity && (
          <div className="space-y-6 animate-fadeIn">
            {/* 1. Current Weather Card */}
            <CurrentWeatherCard
              current={weatherData.current}
              city={selectedCity}
              tempUnit={tempUnit}
              timezone={weatherData.timezone}
            />

            {/* 2. Deterministic Planning Advisory */}
            {forecastItems.length > 0 && (
              <PlanningAdvisory
                forecast={forecastItems}
                selectedIndex={selectedDayIndex}
                onSelectIndex={setSelectedDayIndex}
                tempUnit={tempUnit}
              />
            )}

            {/* 3. 7-Day Forecast Grid */}
            {forecastItems.length > 0 && (
              <Forecast7Day
                forecast={forecastItems}
                selectedIndex={selectedDayIndex}
                onSelectDay={setSelectedDayIndex}
                tempUnit={tempUnit}
              />
            )}

            {/* 4. Visual Charts: Temperature & Rain Probability */}
            {forecastItems.length > 0 && (
              <WeatherCharts
                forecast={forecastItems}
                tempUnit={tempUnit}
              />
            )}
          </div>
        )}
      </main>

      {/* Multiple City Picker Modal */}
      {isPickerOpen && (
        <CityPickerModal
          results={searchResults}
          searchTerm={lastSearchedTerm}
          onSelect={handleSelectCity}
          onClose={() => setIsPickerOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white/60 py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Powered exclusively by{' '}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noreferrer"
              className="text-sky-600 hover:underline font-semibold"
            >
              Open-Meteo
            </a>{' '}
            public endpoints • No API keys, secrets, or server side required
          </div>
          <div>
            Deterministic rules: Rain ≥ 60% • Heat ≥ 35°C • UV ≥ 8 • Wind ≥ 40 km/h
          </div>
        </div>
      </footer>
    </div>
  );
}
