import React from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudHail,
  HelpCircle,
} from 'lucide-react';

interface WeatherIconProps {
  iconType: string;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ iconType, className = 'w-6 h-6' }) => {
  switch (iconType) {
    case 'sun':
      return <Sun className={className} />;
    case 'cloud-sun':
      return <CloudSun className={className} />;
    case 'cloud':
      return <Cloud className={className} />;
    case 'cloud-fog':
      return <CloudFog className={className} />;
    case 'cloud-drizzle':
      return <CloudDrizzle className={className} />;
    case 'cloud-rain':
      return <CloudRain className={className} />;
    case 'cloud-snow':
      return <CloudSnow className={className} />;
    case 'cloud-lightning':
      return <CloudLightning className={className} />;
    case 'cloud-hail':
      return <CloudHail className={className} />;
    default:
      return <HelpCircle className={className} />;
  }
};
