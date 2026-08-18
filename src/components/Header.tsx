import React from 'react';
import { LiturgicalDay, UserPreferences, LanguageMode } from '../types';
import { Calendar, BookOpen, Volume2, VolumeX, Sparkles, Settings as SettingsIcon, Bookmark, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  liturgicalDay: LiturgicalDay;
  preferences: UserPreferences;
  onUpdatePreferences: (updated: Partial<UserPreferences>) => void;
  onOpenCalendar: () => void;
  onOpenSettings: () => void;
  onOpenBookmarks: () => void;
  onOpenAiReflection: () => void;
  isAmbientPlaying: boolean;
  onToggleAmbient: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  liturgicalDay,
  preferences,
  onUpdatePreferences,
  onOpenCalendar,
  onOpenSettings,
  onOpenBookmarks,
  onOpenAiReflection,
  isAmbientPlaying,
  onToggleAmbient,
}) => {
  const getColorBadge = (color: string) => {
    switch (color) {
      case 'purple':
        return 'bg-purple-900/40 text-purple-300 border-purple-700/50';
      case 'white':
        return 'bg-amber-100/20 text-amber-200 border-amber-300/30';
      case 'red':
        return 'bg-red-950/40 text-red-300 border-red-800/50';
      case 'rose':
        return 'bg-pink-900/40 text-pink-300 border-pink-700/50';
      default:
        return 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50';
    }
  };

  const handleLanguageToggle = () => {
    const next: LanguageMode =
      preferences.languageMode === 'english'
        ? 'latin'
        : preferences.languageMode === 'latin'
        ? 'bilingual'
        : 'english';
    onUpdatePreferences({ languageMode: next });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-amber-900/20 bg-amber-950/90 backdrop-blur-md text-amber-100 transition-colors duration-300 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Left branding & Liturgical day summary */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-900 border border-amber-400/30 flex items-center justify-center text-amber-100 shadow-inner">
              <span className="font-serif font-bold text-lg">✝</span>
            </div>
            <div>
              <h1 className="font-serif font-bold text-base sm:text-lg tracking-wide leading-none text-amber-100">
                Liturgy of the Hours
              </h1>
              <span className="text-xs text-amber-300/70 font-sans hidden sm:inline-block">
                Officium Divinum
              </span>
            </div>
          </div>

          <button
            onClick={onOpenCalendar}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border font-medium transition-all hover:brightness-125 ${getColorBadge(
              liturgicalDay.color
            )}`}
            title="Click to view liturgical calendar"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{liturgicalDay.liturgicalTitle}</span>
            <span className="opacity-60">• Psalter Wk {liturgicalDay.weekOfPsalter}</span>
          </button>
        </div>

        {/* Right toolbar controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* AI Commentary Button */}
          <button
            onClick={onOpenAiReflection}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-serif font-semibold bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-amber-100 border border-amber-500/40 shadow-sm transition-all"
            title="Generate AI Patristic Reflection on this hour"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="hidden sm:inline">Reflection</span>
          </button>

          {/* Language Mode Toggle Pill */}
          <button
            onClick={handleLanguageToggle}
            className="px-2.5 py-1.5 rounded-lg text-xs font-sans font-semibold border border-amber-700/40 bg-amber-900/30 hover:bg-amber-800/40 text-amber-200 uppercase tracking-wider transition-all"
            title="Toggle language: English / Latin / Parallel Bilingual"
          >
            {preferences.languageMode}
          </button>

          {/* Ambient Monastic Audio Synth Toggle */}
          <button
            onClick={onToggleAmbient}
            className={`p-2 rounded-lg border transition-all ${
              isAmbientPlaying
                ? 'bg-amber-600/30 border-amber-400/50 text-amber-200 animate-pulse'
                : 'border-amber-900/40 text-amber-400 hover:bg-amber-900/30'
            }`}
            title={isAmbientPlaying ? 'Mute Organ Ambiance' : 'Play Organ Ambiance'}
          >
            {isAmbientPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-70" />}
          </button>

          {/* Calendar Button (mobile) */}
          <button
            onClick={onOpenCalendar}
            className="md:hidden p-2 rounded-lg border border-amber-900/40 text-amber-300 hover:bg-amber-900/30 transition-all"
            title="Liturgical Calendar"
          >
            <Calendar className="w-4 h-4" />
          </button>

          {/* Bookmarks & Intentions */}
          <button
            onClick={onOpenBookmarks}
            className="p-2 rounded-lg border border-amber-900/40 text-amber-300 hover:bg-amber-900/30 transition-all"
            title="Bookmarks & Intentions"
          >
            <Bookmark className="w-4 h-4" />
          </button>

          {/* Settings Modal */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg border border-amber-900/40 text-amber-300 hover:bg-amber-900/30 transition-all"
            title="Appearance & Audio Settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
