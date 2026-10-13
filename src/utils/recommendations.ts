import { DayForecastItem, DayPlanningAdvisory, PlanningRuleAlert } from '../types/weather';

export function evaluatePlanningRules(item: DayForecastItem, index: number): DayPlanningAdvisory {
  const alerts: PlanningRuleAlert[] = [];

  // Rule 1: Rain probability >= 60%
  if (item.rainProb >= 60) {
    alerts.push({
      type: 'rain',
      severity: 'high',
      headline: 'Carry an umbrella / consider rescheduling outdoor plans',
      description: `High precipitation probability (${item.rainProb}%). Wet roads, potential rain bursts, and poor outdoor conditions expected.`,
      badgeLabel: `Rain Risk: ${item.rainProb}%`,
    });
  }

  // Rule 2: Max temp >= 35°C
  if (item.tempMax >= 35) {
    alerts.push({
      type: 'heat',
      severity: 'high',
      headline: 'Avoid midday outdoor work and stay hydrated',
      description: `Extreme heat warning (Peak: ${item.tempMax.toFixed(1)}°C). High risk of heat exhaustion between 11 AM and 4 PM. Seek shade and drink water frequently.`,
      badgeLabel: `High Heat: ${item.tempMax.toFixed(1)}°C`,
    });
  }

  // Rule 3: UV index >= 8
  if (item.uvIndex >= 8) {
    alerts.push({
      type: 'uv',
      severity: 'high',
      headline: 'Very high UV index: use sun protection',
      description: `Intense solar radiation (UV Index ${item.uvIndex.toFixed(1)}). Wear SPF 50+ sunscreen, UV-blocking sunglasses, and protective headwear outdoors.`,
      badgeLabel: `UV Alert: ${item.uvIndex.toFixed(1)}`,
    });
  }

  // Rule 4: Wind >= 40 km/h
  if (item.windSpeedMax >= 40) {
    alerts.push({
      type: 'wind',
      severity: 'high',
      headline: 'High wind alert: caution for two-wheeler travel',
      description: `Strong wind gusts up to ${item.windSpeedMax.toFixed(1)} km/h. Crosswinds pose significant hazard for motorbikes, scooters, and cyclists. Secure loose objects.`,
      badgeLabel: `Wind: ${item.windSpeedMax.toFixed(1)} km/h`,
    });
  }

  // Rule 5: Otherwise -> good day for outdoor plans
  if (alerts.length === 0) {
    alerts.push({
      type: 'clear',
      severity: 'optimal',
      headline: 'Good day for outdoor plans',
      description: `Favorable atmospheric parameters: comfortable temperatures (${item.tempMin.toFixed(0)}°C to ${item.tempMax.toFixed(0)}°C), low rain probability (${item.rainProb}%), mild winds (${item.windSpeedMax.toFixed(0)} km/h), and safe UV index (${item.uvIndex.toFixed(1)}).`,
      badgeLabel: 'All Clear',
    });
  }

  // Overall status determination
  const hasHighAlert = alerts.some((a) => a.severity === 'high');
  const overallStatus = hasHighAlert ? (alerts.length >= 2 ? 'adverse' : 'caution') : 'favorable';

  // Primary headline recommendation
  const primaryRecommendation = alerts[0].headline;

  return {
    date: item.date,
    formattedDate: item.formattedDate,
    dayOfWeek: item.dayOfWeek,
    isToday: index === 0,
    alerts,
    overallStatus,
    primaryRecommendation,
    suitability: {
      outdoorActivities: item.rainProb < 60 && item.tempMax < 35 && item.windSpeedMax < 40,
      twoWheelerCommute: item.windSpeedMax < 40 && item.rainProb < 75,
      middayWorkSafe: item.tempMax < 35 && item.uvIndex < 10,
      umbrellaNeeded: item.rainProb >= 60,
      sunscreenNeeded: item.uvIndex >= 8 || item.tempMax >= 30,
    },
  };
}
