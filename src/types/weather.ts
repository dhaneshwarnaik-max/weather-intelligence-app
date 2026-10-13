export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  country_code?: string;
  timezone?: string;
  country?: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
  generationtime_ms?: number;
}

export interface CurrentWeatherData {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
  precipitation: number;
}

export interface DailyWeatherData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
  uv_index_max: number[];
  wind_speed_10m_max: number[];
}

export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    weather_code: string;
    wind_speed_10m: string;
    precipitation: string;
  };
  current: CurrentWeatherData;
  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    precipitation_probability_max: string;
    uv_index_max: string;
    wind_speed_10m_max: string;
  };
  daily: DailyWeatherData;
}

export interface DayForecastItem {
  date: string;
  formattedDate: string;
  dayOfWeek: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  rainProb: number;
  uvIndex: number;
  windSpeedMax: number;
}

export interface PlanningRuleAlert {
  type: 'rain' | 'heat' | 'uv' | 'wind' | 'clear';
  severity: 'high' | 'moderate' | 'optimal';
  headline: string;
  description: string;
  badgeLabel: string;
}

export interface DayPlanningAdvisory {
  date: string;
  formattedDate: string;
  dayOfWeek: string;
  isToday: boolean;
  alerts: PlanningRuleAlert[];
  overallStatus: 'adverse' | 'caution' | 'favorable';
  primaryRecommendation: string;
  suitability: {
    outdoorActivities: boolean;
    twoWheelerCommute: boolean;
    middayWorkSafe: boolean;
    umbrellaNeeded: boolean;
    sunscreenNeeded: boolean;
  };
}
