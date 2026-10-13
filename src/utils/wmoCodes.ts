export interface WmoInfo {
  label: string;
  icon: 'sun' | 'cloud-sun' | 'cloud' | 'cloud-fog' | 'cloud-drizzle' | 'cloud-rain' | 'cloud-snow' | 'cloud-lightning' | 'cloud-hail';
  description: string;
  gradient: string;
  badgeBg: string;
  badgeText: string;
}

export function getWmoWeatherInfo(code: number): WmoInfo {
  switch (code) {
    case 0:
      return {
        label: 'Clear sky',
        icon: 'sun',
        description: 'Sunny and completely cloudless skies',
        gradient: 'from-amber-500 to-orange-500',
        badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
        badgeText: 'text-amber-800 dark:text-amber-300',
      };
    case 1:
      return {
        label: 'Mainly clear',
        icon: 'cloud-sun',
        description: 'Mostly sunny with minor scattered clouds',
        gradient: 'from-amber-400 to-sky-500',
        badgeBg: 'bg-sky-100 dark:bg-sky-950/60',
        badgeText: 'text-sky-800 dark:text-sky-300',
      };
    case 2:
      return {
        label: 'Partly cloudy',
        icon: 'cloud-sun',
        description: 'Sun alternating with scattered cloud layers',
        gradient: 'from-sky-400 to-slate-500',
        badgeBg: 'bg-slate-100 dark:bg-slate-800',
        badgeText: 'text-slate-800 dark:text-slate-300',
      };
    case 3:
      return {
        label: 'Overcast',
        icon: 'cloud',
        description: 'Heavy overcast cloud cover across the sky',
        gradient: 'from-slate-400 to-slate-600',
        badgeBg: 'bg-slate-200 dark:bg-slate-800',
        badgeText: 'text-slate-800 dark:text-slate-300',
      };
    case 45:
      return {
        label: 'Fog',
        icon: 'cloud-fog',
        description: 'Reduced visibility due to dense ground fog',
        gradient: 'from-zinc-400 to-slate-600',
        badgeBg: 'bg-zinc-200 dark:bg-zinc-800',
        badgeText: 'text-zinc-800 dark:text-zinc-300',
      };
    case 48:
      return {
        label: 'Depositing rime fog',
        icon: 'cloud-fog',
        description: 'Freezing fog depositing frosty rime ice',
        gradient: 'from-teal-400 to-slate-600',
        badgeBg: 'bg-teal-100 dark:bg-teal-950/60',
        badgeText: 'text-teal-800 dark:text-teal-300',
      };
    case 51:
      return {
        label: 'Light drizzle',
        icon: 'cloud-drizzle',
        description: 'Gentle, very light mist and drizzle',
        gradient: 'from-cyan-400 to-blue-500',
        badgeBg: 'bg-cyan-100 dark:bg-cyan-950/60',
        badgeText: 'text-cyan-800 dark:text-cyan-300',
      };
    case 53:
      return {
        label: 'Moderate drizzle',
        icon: 'cloud-drizzle',
        description: 'Steady light drizzle droplets',
        gradient: 'from-cyan-500 to-blue-600',
        badgeBg: 'bg-cyan-100 dark:bg-cyan-950/60',
        badgeText: 'text-cyan-800 dark:text-cyan-300',
      };
    case 55:
      return {
        label: 'Dense drizzle',
        icon: 'cloud-drizzle',
        description: 'Heavy soaking drizzle with low visibility',
        gradient: 'from-blue-400 to-indigo-600',
        badgeBg: 'bg-blue-100 dark:bg-blue-950/60',
        badgeText: 'text-blue-800 dark:text-blue-300',
      };
    case 56:
    case 57:
      return {
        label: 'Freezing drizzle',
        icon: 'cloud-drizzle',
        description: 'Supercooled drizzle creating icy surfaces',
        gradient: 'from-cyan-300 to-indigo-500',
        badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
        badgeText: 'text-indigo-800 dark:text-indigo-300',
      };
    case 61:
      return {
        label: 'Slight rain',
        icon: 'cloud-rain',
        description: 'Light scattered rainfall',
        gradient: 'from-blue-400 to-blue-600',
        badgeBg: 'bg-blue-100 dark:bg-blue-950/60',
        badgeText: 'text-blue-800 dark:text-blue-300',
      };
    case 63:
      return {
        label: 'Moderate rain',
        icon: 'cloud-rain',
        description: 'Steady sustained rain showers',
        gradient: 'from-blue-500 to-indigo-700',
        badgeBg: 'bg-blue-100 dark:bg-blue-950/60',
        badgeText: 'text-blue-800 dark:text-blue-300',
      };
    case 65:
      return {
        label: 'Heavy rain',
        icon: 'cloud-rain',
        description: 'Heavy downpour with puddling and spray',
        gradient: 'from-blue-600 to-slate-800',
        badgeBg: 'bg-blue-200 dark:bg-blue-950',
        badgeText: 'text-blue-900 dark:text-blue-200',
      };
    case 66:
    case 67:
      return {
        label: 'Freezing rain',
        icon: 'cloud-rain',
        description: 'Liquid rain freezing rapidly on cold surfaces',
        gradient: 'from-indigo-400 to-purple-700',
        badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
        badgeText: 'text-indigo-800 dark:text-indigo-300',
      };
    case 71:
      return {
        label: 'Slight snowfall',
        icon: 'cloud-snow',
        description: 'Light fluttering snow flurries',
        gradient: 'from-sky-300 to-indigo-400',
        badgeBg: 'bg-sky-100 dark:bg-sky-950/60',
        badgeText: 'text-sky-800 dark:text-sky-300',
      };
    case 73:
      return {
        label: 'Moderate snowfall',
        icon: 'cloud-snow',
        description: 'Steady snowfall accumulating on ground',
        gradient: 'from-sky-400 to-indigo-500',
        badgeBg: 'bg-sky-100 dark:bg-sky-950/60',
        badgeText: 'text-sky-800 dark:text-sky-300',
      };
    case 75:
      return {
        label: 'Heavy snowfall',
        icon: 'cloud-snow',
        description: 'Intense snow storm with reduced visibility',
        gradient: 'from-indigo-400 to-slate-700',
        badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
        badgeText: 'text-indigo-800 dark:text-indigo-300',
      };
    case 77:
      return {
        label: 'Snow grains',
        icon: 'cloud-snow',
        description: 'Very small white opaque ice grains',
        gradient: 'from-slate-400 to-indigo-600',
        badgeBg: 'bg-slate-100 dark:bg-slate-800',
        badgeText: 'text-slate-800 dark:text-slate-300',
      };
    case 80:
      return {
        label: 'Slight rain showers',
        icon: 'cloud-rain',
        description: 'Passing brief light showers',
        gradient: 'from-blue-400 to-cyan-600',
        badgeBg: 'bg-blue-100 dark:bg-blue-950/60',
        badgeText: 'text-blue-800 dark:text-blue-300',
      };
    case 81:
      return {
        label: 'Moderate rain showers',
        icon: 'cloud-rain',
        description: 'Intermittent heavy rain showers',
        gradient: 'from-blue-500 to-sky-700',
        badgeBg: 'bg-blue-100 dark:bg-blue-950/60',
        badgeText: 'text-blue-800 dark:text-blue-300',
      };
    case 82:
      return {
        label: 'Violent rain showers',
        icon: 'cloud-rain',
        description: 'Sudden intense torrential rain burst',
        gradient: 'from-blue-700 to-indigo-900',
        badgeBg: 'bg-blue-200 dark:bg-blue-950',
        badgeText: 'text-blue-900 dark:text-blue-200',
      };
    case 85:
    case 86:
      return {
        label: 'Snow showers',
        icon: 'cloud-snow',
        description: 'Intermittent snow showers and squalls',
        gradient: 'from-indigo-400 to-slate-800',
        badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
        badgeText: 'text-indigo-800 dark:text-indigo-300',
      };
    case 95:
      return {
        label: 'Thunderstorm',
        icon: 'cloud-lightning',
        description: 'Thunderstorm with lightning and gusty winds',
        gradient: 'from-amber-600 to-indigo-900',
        badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
        badgeText: 'text-amber-800 dark:text-amber-300',
      };
    case 96:
    case 99:
      return {
        label: 'Thunderstorm with hail',
        icon: 'cloud-hail',
        description: 'Severe thunderstorm accompanied by hail',
        gradient: 'from-purple-600 to-slate-900',
        badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
        badgeText: 'text-purple-800 dark:text-purple-300',
      };
    default:
      return {
        label: 'Variable weather',
        icon: 'cloud',
        description: 'Typical atmospheric conditions',
        gradient: 'from-slate-400 to-slate-600',
        badgeBg: 'bg-slate-100 dark:bg-slate-800',
        badgeText: 'text-slate-800 dark:text-slate-300',
      };
  }
}
