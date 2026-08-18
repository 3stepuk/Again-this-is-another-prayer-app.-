import React, { useState, useEffect } from 'react';
import { OfficeData, LiturgicalDay } from '../types';
import { Sparkles, X, BookOpen, Quote, CheckCircle, RefreshCw } from 'lucide-react';

interface AiReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  office: OfficeData;
  liturgicalDay: LiturgicalDay;
  intention?: string;
}

export const AiReflectionModal: React.FC<AiReflectionModalProps> = ({
  isOpen,
  onClose,
  office,
  liturgicalDay,
  intention,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    reflection: string;
    patristicNote: string;
    practicalAction: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchReflection = async () => {
    setLoading(true);
    setError(null);
    try {
      const readingText = office.scripture?.text?.en || office.psalms?.[0]?.verses?.[0]?.en || '';
      const readingTitle = office.scripture?.citation || office.psalms?.[0]?.title || 'Daily Psalms';

      const res = await fetch('/api/liturgy/reflection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          officeName: office.title,
          date: liturgicalDay.dateString,
          season: liturgicalDay.season,
          readingTitle,
          text: readingText,
          intention,
        }),
      });

      if (!res.ok) throw new Error('Failed to fetch reflection');
      const result = await res.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Could not generate reflection');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !data) {
      fetchReflection();
    }
  }, [isOpen, office.hour]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-amber-950 text-amber-50 border border-amber-600/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-amber-900/60 border-b border-amber-700/40">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <h3 className="font-serif font-bold text-lg sm:text-xl">
              Spiritual Reflection & Patristic Note
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-amber-300 hover:bg-amber-800/50 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 font-sans">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
              <p className="font-serif italic text-amber-200 text-center">
                Reflecting on the sacred scripture & Church Fathers for {office.title}...
              </p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-700 text-red-200 text-sm space-y-3">
              <p>{error}</p>
              <button
                onClick={fetchReflection}
                className="px-4 py-2 bg-red-800 hover:bg-red-700 rounded-lg text-xs font-semibold"
              >
                Try Again
              </button>
            </div>
          ) : data ? (
            <div className="space-y-6">
              {/* Main Spiritual Reflection */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-300" />
                  Homiletic Meditation
                </span>
                <p className="font-serif text-sm sm:text-base leading-relaxed text-amber-100 whitespace-pre-line bg-amber-900/30 p-4 rounded-xl border border-amber-700/30">
                  {data.reflection}
                </p>
              </div>

              {/* Patristic Note */}
              {data.patristicNote && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Quote className="w-4 h-4 text-amber-300" />
                    Patristic Insight
                  </span>
                  <blockquote className="font-serif italic text-sm text-amber-200 bg-amber-900/40 p-4 rounded-xl border-l-4 border-amber-500">
                    "{data.patristicNote}"
                  </blockquote>
                </div>
              )}

              {/* Practical Action */}
              {data.practicalAction && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-300" />
                    Daily Practice
                  </span>
                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-700/50 text-xs sm:text-sm text-emerald-100 font-medium">
                    {data.practicalAction}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-amber-900/40 border-t border-amber-700/30 flex justify-between items-center text-xs text-amber-300/70">
          <span>{office.title} • {liturgicalDay.season}</span>
          <button
            onClick={fetchReflection}
            className="flex items-center gap-1 text-amber-300 hover:text-amber-100 font-medium"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
};
