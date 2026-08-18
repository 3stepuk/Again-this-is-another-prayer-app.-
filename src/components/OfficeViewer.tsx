import React, { useState, useEffect, useRef } from 'react';
import { OfficeData, UserPreferences, Bookmark, LiturgicalDay } from '../types';
import { textReader } from '../utils/audioSynth';
import { Play, Pause, Square, BookmarkPlus, Sparkles, FastForward, Heart, Cross } from 'lucide-react';

interface OfficeViewerProps {
  office: OfficeData;
  liturgicalDay: LiturgicalDay;
  preferences: UserPreferences;
  onAddBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  onOpenAiReflection: () => void;
  intention?: string;
  onUpdateIntention: (val: string) => void;
}

export const OfficeViewer: React.FC<OfficeViewerProps> = ({
  office,
  liturgicalDay,
  preferences,
  onAddBookmark,
  onOpenAiReflection,
  intention,
  onUpdateIntention,
}) => {
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll effect
  useEffect(() => {
    let interval: any = null;
    if (isAutoScrolling && preferences.autoScrollSpeed > 0) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ top: 1.5 * preferences.autoScrollSpeed, behavior: 'smooth' });
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling, preferences.autoScrollSpeed]);

  // Clean up TTS on unmount or office change
  useEffect(() => {
    textReader.stop();
    setIsPlayingTTS(false);
  }, [office.hour]);

  const handleToggleTTS = () => {
    if (isPlayingTTS) {
      textReader.stop();
      setIsPlayingTTS(false);
    } else {
      // Build composite spoken prayer text
      let spokenText = `${office.title}. ${office.invitatoryAntiphon ? 'Invitatory antiphon: ' + office.invitatoryAntiphon.en + '.' : ''} Hymn: ${office.hymn.title}. ${office.hymn.text.en}. `;

      office.psalms.forEach((p) => {
        spokenText += `${p.title}. Antiphon: ${p.antiphon.en}. `;
        p.verses.forEach((v) => {
          spokenText += `${v.en} `;
        });
      });

      spokenText += `Scripture Reading from ${office.scripture.citation}. ${office.scripture.text.en}. `;

      if (office.gospelCanticle) {
        spokenText += `${office.gospelCanticle.title}. ${office.gospelCanticle.verses.map((v) => v.en).join(' ')}. `;
      }

      spokenText += `Concluding Prayer. ${office.concludingPrayer.en}`;

      textReader.speak(
        spokenText,
        () => setIsPlayingTTS(false),
        preferences.ttsVoiceRate
      );
      setIsPlayingTTS(true);
    }
  };

  const handleBookmark = (title: string, text: string) => {
    onAddBookmark({
      date: liturgicalDay.dateString,
      hour: office.hour,
      title: `${office.title} - ${title}`,
      snippet: text.slice(0, 120) + '...',
    });
    setCopiedId(title);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Theme styling rules
  const getThemeClasses = () => {
    switch (preferences.theme) {
      case 'autumn_dark':
        return 'bg-[#120b06] text-[#f4e4cf] border-amber-900/30';
      case 'candlelight':
        return 'bg-[#1a110a] text-[#fad7a0] border-amber-800/40';
      case 'monastery':
        return 'bg-[#0a0d10] text-[#dce2ec] border-slate-800';
      case 'parchment':
      default:
        return 'bg-[#1e150d] text-[#f0dfcc] border-amber-900/30';
    }
  };

  // Font style rules
  const getFontClass = () => {
    switch (preferences.fontStyle) {
      case 'cinzel':
        return 'font-serif tracking-wide';
      case 'serif':
        return 'font-serif';
      case 'sans':
      default:
        return 'font-sans';
    }
  };

  // Font size rules
  const getFontSizeClass = () => {
    switch (preferences.fontSize) {
      case 'sm':
        return 'text-sm sm:text-base leading-relaxed';
      case 'lg':
        return 'text-lg sm:text-xl leading-relaxed';
      case 'xl':
        return 'text-xl sm:text-2xl leading-loose';
      case 'md':
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  const isBilingual = preferences.languageMode === 'bilingual';
  const showEn = preferences.languageMode === 'english' || isBilingual;
  const showLa = preferences.languageMode === 'latin' || isBilingual;

  return (
    <div
      ref={scrollRef}
      className={`w-full min-h-[calc(100vh-8rem)] px-4 sm:px-8 py-8 transition-colors duration-300 ${getThemeClasses()} ${getFontClass()}`}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Office Title Banner */}
        <div className="text-center pb-6 border-b border-amber-900/40 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-sans font-bold">
            <Cross className="w-3.5 h-3.5 text-red-400" />
            <span>{office.recommendedTime}</span>
            <span>•</span>
            <span>{liturgicalDay.liturgicalTitle}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-amber-100">
            {office.title}
          </h2>
          <p className="text-sm italic opacity-80 text-amber-200/80">{office.latinTitle}</p>

          {/* Dedicated Prayer Intention Banner */}
          <div className="pt-3 max-w-md mx-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-900/40 border border-amber-600/30 text-xs font-sans text-amber-200">
              <Heart className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <input
                type="text"
                value={intention || ''}
                onChange={(e) => onUpdateIntention(e.target.value)}
                placeholder="Offer this hour for an intention (e.g., family peace, healing)..."
                className="w-full bg-transparent border-none focus:outline-none text-xs text-inherit placeholder:text-amber-300/40"
              />
            </div>
          </div>

          {/* Controls Bar: Audio Reader, Auto-scroll, AI Reflection */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4 font-sans text-xs">
            <button
              onClick={handleToggleTTS}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-all ${
                isPlayingTTS
                  ? 'bg-red-800 text-white border-red-600 shadow-sm animate-pulse'
                  : 'bg-amber-900/20 hover:bg-amber-900/30 border-amber-800/30'
              }`}
            >
              {isPlayingTTS ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingTTS ? 'Pause Reader' : 'Audio Reader'}</span>
            </button>

            <button
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-all ${
                isAutoScrolling
                  ? 'bg-emerald-800 text-white border-emerald-600'
                  : 'bg-amber-900/20 hover:bg-amber-900/30 border-amber-800/30'
              }`}
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>{isAutoScrolling ? 'Stop Auto-Scroll' : 'Auto-Scroll'}</span>
            </button>

            <button
              onClick={onOpenAiReflection}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-700 to-amber-900 text-white border border-amber-500/40 shadow-sm hover:brightness-110 font-medium transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Patristic Commentary</span>
            </button>
          </div>
        </div>

        {/* Introductory Verse / Rubric */}
        <div className="space-y-2 border-l-2 border-red-500/80 pl-4 py-1 text-xs sm:text-sm font-sans">
          {preferences.showRubrics && (
            <p className="text-red-400 font-semibold italic">
              † Leader: God, come to my assistance. <br />
              All: Lord, make haste to help me.
            </p>
          )}
          <p className="opacity-90 italic font-serif">
            {showEn && <span>Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be forever. Amen. Alleluia.</span>}
            {showLa && <span className="block mt-1 text-amber-300 font-medium">Gloria Patri, et Filio, et Spiritui Sancto: Sicut erat in principio, et nunc, et semper, et in saecula saeculorum. Amen. Alleluia.</span>}
          </p>
        </div>

        {/* Invitatory Psalm (If applicable) */}
        {office.invitatoryPsalm && (
          <section className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-amber-800/40 pb-1">
              <h3 className="font-serif font-bold text-lg text-amber-300">
                Invitatory Psalm
              </h3>
            </div>

            {office.invitatoryAntiphon && (
              <div className="bg-amber-950/60 border border-amber-700/40 p-3.5 rounded-xl space-y-1">
                <span className="text-xs font-semibold text-red-400 block font-sans uppercase tracking-wider">
                  ANTIPHON:
                </span>
                {showEn && <p className="font-medium italic text-amber-100">{office.invitatoryAntiphon.en}</p>}
                {showLa && <p className="font-medium italic text-amber-300">{office.invitatoryAntiphon.la}</p>}
              </div>
            )}

            <div className={`space-y-3 ${getFontSizeClass()}`}>
              {office.invitatoryPsalm.verses.map((verse, idx) => (
                <div key={idx} className={isBilingual ? 'grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-amber-900/30 pb-2' : 'space-y-1'}>
                  {showEn && <p>{verse.en}</p>}
                  {showLa && <p className="italic text-amber-300/90">{verse.la}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hymn Section */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between border-b border-amber-800/40 pb-1">
            <h3 className="font-serif font-bold text-xl text-amber-200">
              Hymn: {office.hymn.title}
            </h3>
            <button
              onClick={() => handleBookmark('Hymn', office.hymn.text.en)}
              className="p-1 text-xs opacity-70 hover:opacity-100 flex items-center gap-1 font-sans text-amber-300"
              title="Save Hymn"
            >
              <BookmarkPlus className="w-4 h-4" />
              {copiedId === 'Hymn' && <span className="text-emerald-400">Saved!</span>}
            </button>
          </div>

          <div className={`whitespace-pre-line ${getFontSizeClass()} ${isBilingual ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-2'}`}>
            {showEn && <div className="leading-relaxed text-amber-100">{office.hymn.text.en}</div>}
            {showLa && <div className="leading-relaxed italic text-amber-300/90">{office.hymn.text.la}</div>}
          </div>
        </section>

        {/* Psalms Section */}
        {office.psalms.length > 0 && (
          <section className="space-y-8 pt-4">
            <h3 className="font-serif font-bold text-2xl border-b border-amber-800/40 pb-2 text-amber-200">
              Psalms & Canticles
            </h3>

            {office.psalms.map((psalm) => (
              <div key={psalm.id} className="space-y-4 bg-amber-950/40 p-4 sm:p-6 rounded-2xl border border-amber-700/30 shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-xl text-amber-100">{psalm.title}</h4>
                    {psalm.subtitle && <p className="text-xs text-amber-300/70 font-sans italic">{psalm.subtitle}</p>}
                  </div>
                  <button
                    onClick={() => handleBookmark(psalm.title, psalm.verses[0]?.en || '')}
                    className="p-1 opacity-70 hover:opacity-100 flex items-center gap-1 text-xs font-sans text-amber-300"
                  >
                    <BookmarkPlus className="w-4 h-4" />
                    {copiedId === psalm.title && <span className="text-emerald-400">Saved</span>}
                  </button>
                </div>

                {/* Antiphon */}
                <div className="border-l-2 border-amber-500 pl-3 py-1.5 space-y-1 bg-amber-900/40 rounded-r-lg font-sans text-sm">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wide">
                    Antiphon:
                  </span>
                  {showEn && <p className="font-medium italic text-amber-100">{psalm.antiphon.en}</p>}
                  {showLa && <p className="font-medium italic text-amber-300">{psalm.antiphon.la}</p>}
                </div>

                {/* Verses */}
                <div className={`space-y-4 ${getFontSizeClass()}`}>
                  {psalm.verses.map((v, i) => (
                    <div
                      key={i}
                      className={isBilingual ? 'grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-amber-900/30 pb-2' : 'space-y-1'}
                    >
                      {showEn && <p><span className="text-xs opacity-50 font-sans mr-2 text-amber-400">{i + 1}</span>{v.en}</p>}
                      {showLa && <p className="italic text-amber-300/90"><span className="text-xs opacity-50 font-sans mr-2 text-amber-400">{i + 1}</span>{v.la}</p>}
                    </div>
                  ))}
                </div>

                {/* Gloria Patri */}
                <div className="text-xs sm:text-sm italic opacity-90 pt-2 border-t border-amber-900/30">
                  {showEn && <p>{psalm.gloriaPatri.en}</p>}
                  {showLa && <p className="mt-1 text-amber-300">{psalm.gloriaPatri.la}</p>}
                </div>

                {/* Repeat Antiphon */}
                <div className="border-l-2 border-amber-500 pl-3 py-1 bg-amber-900/40 rounded-r-lg font-sans text-xs italic">
                  <span className="font-bold text-red-400">Ant. </span>
                  {showEn && <span className="text-amber-100">{psalm.antiphon.en}</span>}
                  {showLa && <span className="ml-2 text-amber-300">{psalm.antiphon.la}</span>}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Short Scripture Reading */}
        <section className="space-y-4 pt-4">
          <div className="border-b border-amber-800/40 pb-1">
            <span className="text-xs uppercase tracking-widest text-red-400 font-bold font-sans">
              Scripture Reading
            </span>
            <h3 className="font-serif font-bold text-xl text-amber-100">{office.scripture.citation}</h3>
          </div>

          <div className={`p-4 sm:p-5 rounded-2xl bg-amber-950/40 border border-amber-700/30 shadow-md ${getFontSizeClass()} ${isBilingual ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-2'}`}>
            {showEn && <p className="leading-relaxed font-serif text-amber-100">{office.scripture.text.en}</p>}
            {showLa && <p className="leading-relaxed font-serif italic text-amber-300/90">{office.scripture.text.la}</p>}
          </div>

          {office.scripture.responsory && (
            <div className="space-y-1 text-sm font-sans pl-3 border-l-2 border-red-500">
              {showEn && (
                <>
                  <p className="font-semibold text-amber-100">{office.scripture.responsory.versicle.en}</p>
                  <p className="opacity-80 text-amber-200">{office.scripture.responsory.response.en}</p>
                </>
              )}
              {showLa && (
                <div className="pt-1 text-amber-300 italic">
                  <p>{office.scripture.responsory.versicle.la}</p>
                  <p>{office.scripture.responsory.response.la}</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Patristic Reading (For Office of Readings) */}
        {office.patristicReading && (
          <section className="space-y-4 pt-4">
            <div className="border-b border-amber-800/40 pb-1">
              <span className="text-xs uppercase tracking-widest text-red-400 font-bold font-sans">
                Patristic Reading
              </span>
              <h3 className="font-serif font-bold text-xl text-amber-100">{office.patristicReading.title}</h3>
              <p className="text-xs text-amber-300/70 font-sans italic">
                By {office.patristicReading.author} ({office.patristicReading.work})
              </p>
            </div>

            <div className={`p-5 rounded-2xl bg-amber-950/50 border border-amber-700/40 shadow-lg ${getFontSizeClass()} ${isBilingual ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-3'}`}>
              {showEn && <p className="leading-relaxed whitespace-pre-line text-amber-100">{office.patristicReading.text.en}</p>}
              {showLa && <p className="leading-relaxed whitespace-pre-line italic text-amber-300/90">{office.patristicReading.text.la}</p>}
            </div>
          </section>
        )}

        {/* Gospel Canticle (Benedictus, Magnificat, Nunc Dimittis) */}
        {office.gospelCanticle && (
          <section className="space-y-4 pt-4">
            <div className="border-b border-amber-800/40 pb-1">
              <span className="text-xs uppercase tracking-widest text-red-400 font-bold font-sans">
                Gospel Canticle
              </span>
              <h3 className="font-serif font-bold text-2xl text-amber-100">{office.gospelCanticle.title}</h3>
            </div>

            <div className="bg-amber-950/40 border border-amber-700/30 p-4 sm:p-6 rounded-2xl space-y-4 shadow-lg">
              <div className="border-l-2 border-red-500 pl-3 py-1 font-sans text-sm bg-amber-900/30 rounded-r-lg">
                <span className="text-xs font-bold text-red-400 uppercase">Antiphon:</span>
                {showEn && <p className="font-medium italic text-amber-100">{office.gospelCanticle.antiphon.en}</p>}
                {showLa && <p className="font-medium italic text-amber-300">{office.gospelCanticle.antiphon.la}</p>}
              </div>

              <div className={`space-y-3 ${getFontSizeClass()}`}>
                {office.gospelCanticle.verses.map((v, i) => (
                  <div key={i} className={isBilingual ? 'grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-amber-900/30 pb-2' : 'space-y-1'}>
                    {showEn && <p>{v.en}</p>}
                    {showLa && <p className="italic text-amber-300/90">{v.la}</p>}
                  </div>
                ))}
              </div>

              <div className="text-xs sm:text-sm italic opacity-90 pt-2 border-t border-amber-900/30">
                {showEn && <p>{office.gospelCanticle.gloriaPatri.en}</p>}
                {showLa && <p className="mt-1 text-amber-300">{office.gospelCanticle.gloriaPatri.la}</p>}
              </div>
            </div>
          </section>
        )}

        {/* Intercessions */}
        {office.intercessions && (
          <section className="space-y-4 pt-4 font-sans">
            <h3 className="font-serif font-bold text-xl border-b border-amber-800/40 pb-1 text-amber-200">
              Intercessions
            </h3>

            <div className="bg-amber-950/40 border border-amber-700/30 p-4 sm:p-5 rounded-2xl space-y-3 text-sm shadow-md">
              <p className="font-bold text-red-400 text-base">
                Refrain: {office.intercessions.refrain.en}
              </p>

              <ul className="space-y-3 list-disc pl-5 text-amber-100">
                {office.intercessions.petitions.map((p, i) => (
                  <li key={i} className="space-y-1">
                    {showEn && <p>{p.en}</p>}
                    {showLa && <p className="italic text-amber-300">{p.la}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Lord's Prayer (Paternoster) */}
        <section className="space-y-2 pt-2 text-center max-w-xl mx-auto">
          <h4 className="font-serif font-bold text-lg text-amber-200">
            The Lord’s Prayer (Paternoster)
          </h4>
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/50 border border-amber-700/30 text-sm sm:text-base leading-relaxed text-amber-100 shadow-md">
            {showEn && <p className="font-serif">{office.lordsPrayer.en}</p>}
            {showLa && <p className="font-serif italic text-amber-300 mt-2">{office.lordsPrayer.la}</p>}
          </div>
        </section>

        {/* Concluding Prayer / Collect */}
        <section className="space-y-2 pt-2 border-t border-amber-800/40">
          <span className="text-xs uppercase tracking-widest text-red-400 font-bold font-sans">
            Concluding Prayer
          </span>
          <div className={`p-5 rounded-2xl bg-amber-950/50 border border-amber-700/30 ${getFontSizeClass()} shadow-md`}>
            {showEn && <p className="leading-relaxed font-serif text-amber-100">{office.concludingPrayer.en}</p>}
            {showLa && <p className="leading-relaxed font-serif italic text-amber-300 mt-2">{office.concludingPrayer.la}</p>}
          </div>
        </section>

        {/* Marian Antiphon (For Compline) */}
        {office.marianAntiphon && (
          <section className="space-y-3 pt-4 border-t-2 border-amber-700/40 text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold font-sans">
              Marian Antiphon: {office.marianAntiphon.name}
            </span>
            <div className={`p-6 rounded-2xl bg-amber-950/60 border border-amber-600/40 ${getFontSizeClass()} space-y-3 shadow-xl`}>
              {showEn && <p className="font-serif italic text-amber-100">{office.marianAntiphon.antiphon.en}</p>}
              {showLa && <p className="font-serif italic text-amber-300">{office.marianAntiphon.antiphon.la}</p>}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
