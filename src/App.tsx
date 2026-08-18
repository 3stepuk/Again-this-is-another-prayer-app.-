import React, { useState, useEffect } from 'react';
import { HourType, UserPreferences, Bookmark, Intention } from './types';
import { getLiturgicalDay } from './utils/liturgicalCalendar';
import { getOfficeData } from './data/liturgyData';
import { ambianceSynth } from './utils/audioSynth';
import { Header } from './components/Header';
import { HourNavigation } from './components/HourNavigation';
import { OfficeViewer } from './components/OfficeViewer';
import { AiReflectionModal } from './components/AiReflectionModal';
import { CalendarModal } from './components/CalendarModal';
import { SettingsModal } from './components/SettingsModal';
import { BookmarksView } from './components/BookmarksView';

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'autumn_dark',
  fontStyle: 'serif',
  fontSize: 'md',
  languageMode: 'bilingual',
  showRubrics: true,
  autoScrollSpeed: 0,
  ambientSound: 'none',
  ttsVoiceRate: 0.95,
};

export default function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentHour, setCurrentHour] = useState<HourType>(() => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 8) return 'lauds';
    if (hours >= 8 && hours < 11) return 'terce';
    if (hours >= 11 && hours < 14) return 'sext';
    if (hours >= 14 && hours < 17) return 'none';
    if (hours >= 17 && hours < 21) return 'vespers';
    if (hours >= 21 || hours < 5) return 'compline';
    return 'readings';
  });

  // LocalStorage persisted preferences
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem('loth_preferences');
      return saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  // LocalStorage persisted bookmarks
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const saved = localStorage.getItem('loth_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // LocalStorage persisted intentions
  const [intentions, setIntentions] = useState<Intention[]>(() => {
    try {
      const saved = localStorage.getItem('loth_intentions');
      return saved ? JSON.parse(saved) : [
        { id: '1', text: 'For peace in families and the protection of life', category: 'family', createdAt: new Date().toISOString() },
        { id: '2', text: 'For all the sick, lonely, and elderly', category: 'sick', createdAt: new Date().toISOString() }
      ];
    } catch {
      return [];
    }
  });

  const [currentIntention, setCurrentIntention] = useState<string>('');
  const [isAmbientPlaying, setIsAmbientPlaying] = useState<boolean>(false);

  // Modals state
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isAiReflectionOpen, setIsAiReflectionOpen] = useState(false);

  // Save preferences
  const updatePreferences = (updated: Partial<UserPreferences>) => {
    setPreferences((prev) => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem('loth_preferences', JSON.stringify(next));
      } catch (e) {
        console.warn('LocalStorage save failed', e);
      }
      return next;
    });
  };

  // Save bookmarks
  const handleAddBookmark = (item: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newBm: Bookmark = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [newBm, ...bookmarks];
    setBookmarks(updated);
    try {
      localStorage.setItem('loth_bookmarks', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleRemoveBookmark = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    try {
      localStorage.setItem('loth_bookmarks', JSON.stringify(updated));
    } catch (e) {}
  };

  // Intentions management
  const handleAddIntention = (text: string, category: Intention['category']) => {
    const newIt: Intention = {
      id: Date.now().toString(),
      text,
      category,
      createdAt: new Date().toISOString(),
    };
    const updated = [newIt, ...intentions];
    setIntentions(updated);
    try {
      localStorage.setItem('loth_intentions', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleRemoveIntention = (id: string) => {
    const updated = intentions.filter((i) => i.id !== id);
    setIntentions(updated);
    try {
      localStorage.setItem('loth_intentions', JSON.stringify(updated));
    } catch (e) {}
  };

  // Toggle ambient synth organ drone
  const handleToggleAmbient = () => {
    if (isAmbientPlaying) {
      ambianceSynth.stop();
      setIsAmbientPlaying(false);
    } else {
      ambianceSynth.start('organ_drone');
      setIsAmbientPlaying(true);
    }
  };

  const liturgicalDay = getLiturgicalDay(selectedDate);
  const officeData = getOfficeData(currentHour, liturgicalDay.season);

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0804] text-amber-50 selection:bg-amber-700 selection:text-white">
      {/* Top App Header */}
      <Header
        liturgicalDay={liturgicalDay}
        preferences={preferences}
        onUpdatePreferences={updatePreferences}
        onOpenCalendar={() => setIsCalendarOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenAiReflection={() => setIsAiReflectionOpen(true)}
        isAmbientPlaying={isAmbientPlaying}
        onToggleAmbient={handleToggleAmbient}
      />

      {/* Hour Switcher Navigation Bar */}
      <HourNavigation
        currentHour={currentHour}
        onSelectHour={(hour) => setCurrentHour(hour)}
      />

      {/* Main Breviary Office Content */}
      <main className="flex-1">
        <OfficeViewer
          office={officeData}
          liturgicalDay={liturgicalDay}
          preferences={preferences}
          onAddBookmark={handleAddBookmark}
          onOpenAiReflection={() => setIsAiReflectionOpen(true)}
          intention={currentIntention}
          onUpdateIntention={setCurrentIntention}
        />
      </main>

      {/* Modals */}
      <AiReflectionModal
        isOpen={isAiReflectionOpen}
        onClose={() => setIsAiReflectionOpen(false)}
        office={officeData}
        liturgicalDay={liturgicalDay}
        intention={currentIntention}
      />

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        selectedDate={selectedDate}
        onSelectDate={(d) => {
          setSelectedDate(d);
          setIsCalendarOpen(false);
        }}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        preferences={preferences}
        onUpdatePreferences={updatePreferences}
      />

      <BookmarksView
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={handleRemoveBookmark}
        intentions={intentions}
        onAddIntention={handleAddIntention}
        onRemoveIntention={handleRemoveIntention}
      />
    </div>
  );
}
