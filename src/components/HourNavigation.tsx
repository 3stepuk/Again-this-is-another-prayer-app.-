import React from 'react';
import { HourType } from '../types';
import { Sun, Sunrise, Sunset, Moon, Clock, BookOpen, Compass } from 'lucide-react';

interface HourNavigationProps {
  currentHour: HourType;
  onSelectHour: (hour: HourType) => void;
}

const HOURS_CONFIG: Array<{
  id: HourType;
  name: string;
  latin: string;
  timeRange: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: 'invitatory', name: 'Invitatory', latin: 'Invitatorium', timeRange: '5:30 AM', icon: Compass },
  { id: 'readings', name: 'Office of Readings', latin: 'Officium Lectionis', timeRange: 'Vigil / Early', icon: BookOpen },
  { id: 'lauds', name: 'Morning Prayer', latin: 'Laudes', timeRange: '6:00 - 8:30 AM', icon: Sunrise },
  { id: 'terce', name: 'Midmorning', latin: 'Terce', timeRange: '9:00 AM', icon: Sun },
  { id: 'sext', name: 'Midday', latin: 'Sext', timeRange: '12:00 PM', icon: Sun },
  { id: 'none', name: 'Midafternoon', latin: 'None', timeRange: '3:00 PM', icon: Sun },
  { id: 'vespers', name: 'Evening Prayer', latin: 'Vesperae', timeRange: '5:30 - 7:30 PM', icon: Sunset },
  { id: 'compline', name: 'Night Prayer', latin: 'Completorium', timeRange: '9:00 PM+', icon: Moon },
];

export const HourNavigation: React.FC<HourNavigationProps> = ({ currentHour, onSelectHour }) => {
  // Determine suggested current hour based on local time
  const getSuggestedHour = (): HourType => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 8) return 'lauds';
    if (hours >= 8 && hours < 11) return 'terce';
    if (hours >= 11 && hours < 14) return 'sext';
    if (hours >= 14 && hours < 17) return 'none';
    if (hours >= 17 && hours < 21) return 'vespers';
    if (hours >= 21 || hours < 5) return 'compline';
    return 'readings';
  };

  const suggested = getSuggestedHour();

  return (
    <nav className="w-full bg-amber-950/40 border-b border-amber-900/30 overflow-x-auto no-scrollbar shadow-inner py-2 px-3">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 sm:gap-2 min-w-max">
        {HOURS_CONFIG.map((h) => {
          const Icon = h.icon;
          const isSelected = currentHour === h.id;
          const isSuggested = suggested === h.id;

          return (
            <button
              key={h.id}
              onClick={() => onSelectHour(h.id)}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
                isSelected
                  ? 'bg-amber-800/80 text-amber-50 border-amber-500/60 shadow-md scale-105 z-10'
                  : 'bg-amber-950/30 text-amber-300/80 hover:bg-amber-900/40 hover:text-amber-100 border-amber-900/20'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSelected ? 'text-amber-200' : 'text-amber-400/70'}`} />
              <div className="flex flex-col items-start leading-tight">
                <span className="font-serif font-semibold">{h.name}</span>
                <span className="text-[10px] opacity-70 font-sans tracking-tight">{h.latin}</span>
              </div>

              {isSuggested && !isSelected && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
