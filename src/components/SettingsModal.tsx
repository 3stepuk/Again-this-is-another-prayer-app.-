import React from 'react';
import { UserPreferences, DisplayTheme, FontStyle, LanguageMode } from '../types';
import { Settings, X, Type, Globe, Sliders, Volume2 } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onUpdatePreferences: (updated: Partial<UserPreferences>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onUpdatePreferences,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-amber-950 text-amber-50 border border-amber-600/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-amber-900/60 border-b border-amber-700/40">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-300" />
            <h3 className="font-serif font-bold text-lg">Breviary Settings</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-amber-800/50">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 font-sans text-sm">
          {/* Display Theme */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              Color Theme
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'autumn_dark', name: 'Autumn Dark', bg: 'bg-[#120b06] text-amber-200 border-amber-600' },
                { id: 'candlelight', name: 'Candlelight Dark', bg: 'bg-[#1a110a] text-amber-300 border-amber-700' },
                { id: 'monastery', name: 'Monastery Night', bg: 'bg-[#0a0d10] text-slate-200 border-slate-700' },
                { id: 'parchment', name: 'Dark Parchment', bg: 'bg-[#1e150d] text-amber-100 border-amber-800' },
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => onUpdatePreferences({ theme: theme.id as DisplayTheme })}
                  className={`p-3 rounded-xl border text-left font-serif text-xs font-bold transition-all ${theme.bg} ${
                    preferences.theme === theme.id ? 'ring-2 ring-amber-400 scale-[1.02]' : 'opacity-80'
                  }`}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <Type className="w-4 h-4" /> Font Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'serif', name: 'Garamond Serif' },
                { id: 'cinzel', name: 'Cinzel Classic' },
                { id: 'sans', name: 'Modern Sans' },
              ].map((font) => (
                <button
                  key={font.id}
                  onClick={() => onUpdatePreferences({ fontStyle: font.id as FontStyle })}
                  className={`p-2.5 rounded-xl border border-amber-700/40 text-xs font-semibold text-center transition-all ${
                    preferences.fontStyle === font.id ? 'bg-amber-700 text-amber-50 ring-2 ring-amber-400' : 'bg-amber-900/30 text-amber-200'
                  }`}
                >
                  {font.name}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              Text Size
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'sm', label: 'Small' },
                { id: 'md', label: 'Medium' },
                { id: 'lg', label: 'Large' },
                { id: 'xl', label: 'Extra Large' },
              ].map((sz) => (
                <button
                  key={sz.id}
                  onClick={() => onUpdatePreferences({ fontSize: sz.id as any })}
                  className={`p-2 rounded-xl border border-amber-700/40 text-xs font-semibold text-center transition-all ${
                    preferences.fontSize === sz.id ? 'bg-amber-700 text-amber-50 ring-2 ring-amber-400' : 'bg-amber-900/30 text-amber-200'
                  }`}
                >
                  {sz.label}
                </button>
              ))}
            </div>
          </div>

          {/* Language Mode */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <Globe className="w-4 h-4" /> Language Display
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'english', label: 'English' },
                { id: 'latin', label: 'Latin (Latinum)' },
                { id: 'bilingual', label: 'Bilingual Parallel' },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => onUpdatePreferences({ languageMode: lang.id as LanguageMode })}
                  className={`p-2.5 rounded-xl border border-amber-700/40 text-xs font-semibold text-center transition-all ${
                    preferences.languageMode === lang.id ? 'bg-amber-700 text-amber-50 ring-2 ring-amber-400' : 'bg-amber-900/30 text-amber-200'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rubrics & Speech Controls */}
          <div className="space-y-4 pt-2 border-t border-amber-800/40">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold block">Show Liturgical Rubrics</span>
                <span className="text-xs opacity-70">Red instructional cues & leader responses</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.showRubrics}
                onChange={(e) => onUpdatePreferences({ showRubrics: e.target.checked })}
                className="w-4 h-4 accent-amber-500 rounded"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span>Auto-Scroll Speed</span>
                <span>{preferences.autoScrollSpeed}x</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={preferences.autoScrollSpeed}
                onChange={(e) => onUpdatePreferences({ autoScrollSpeed: Number(e.target.value) })}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span>Audio Reader Speed</span>
                <span>{preferences.ttsVoiceRate}x</span>
              </div>
              <input
                type="range"
                min="0.7"
                max="1.3"
                step="0.05"
                value={preferences.ttsVoiceRate}
                onChange={(e) => onUpdatePreferences({ ttsVoiceRate: Number(e.target.value) })}
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-amber-900/40 border-t border-amber-700/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-700 hover:bg-amber-600 rounded-xl text-xs font-bold text-amber-50"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
