import React, { useState } from 'react';
import { Bookmark, Intention } from '../types';
import { Bookmark as BookmarkIcon, X, Trash2, Heart, Plus } from 'lucide-react';

interface BookmarksViewProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  onRemoveBookmark: (id: string) => void;
  intentions: Intention[];
  onAddIntention: (text: string, category: Intention['category']) => void;
  onRemoveIntention: (id: string) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  intentions,
  onAddIntention,
  onRemoveIntention,
}) => {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'intentions'>('bookmarks');
  const [newIntentionText, setNewIntentionText] = useState('');
  const [category, setCategory] = useState<Intention['category']>('personal');

  if (!isOpen) return null;

  const handleAddIntentionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIntentionText.trim()) return;
    onAddIntention(newIntentionText.trim(), category);
    setNewIntentionText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl bg-amber-950 text-amber-50 border border-amber-600/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Tabs */}
        <div className="flex items-center justify-between px-6 py-4 bg-amber-900/60 border-b border-amber-700/40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`font-serif font-bold text-base sm:text-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'bookmarks' ? 'text-amber-200 border-b-2 border-amber-400 pb-0.5' : 'text-amber-400/60 hover:text-amber-200'
              }`}
            >
              <BookmarkIcon className="w-4 h-4" />
              Saved Verses ({bookmarks.length})
            </button>
            <button
              onClick={() => setActiveTab('intentions')}
              className={`font-serif font-bold text-base sm:text-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'intentions' ? 'text-amber-200 border-b-2 border-amber-400 pb-0.5' : 'text-amber-400/60 hover:text-amber-200'
              }`}
            >
              <Heart className="w-4 h-4 text-red-400" />
              Prayer Intentions ({intentions.length})
            </button>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-amber-800/50">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-4 font-sans flex-1">
          {activeTab === 'bookmarks' ? (
            bookmarks.length === 0 ? (
              <div className="text-center py-12 space-y-2 opacity-60">
                <BookmarkIcon className="w-10 h-10 mx-auto text-amber-400 stroke-1" />
                <p className="font-serif italic">No saved verses yet.</p>
                <p className="text-xs">Click the bookmark icon next to any psalm or reading while praying to save it here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarks.map((bm) => (
                  <div
                    key={bm.id}
                    className="p-4 rounded-xl bg-amber-900/30 border border-amber-700/30 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-amber-200 text-sm">{bm.title}</span>
                        <span className="text-[10px] opacity-60 bg-amber-800/40 px-2 py-0.5 rounded-full">{bm.date}</span>
                      </div>
                      <p className="text-xs italic text-amber-100/90 leading-relaxed font-serif">"{bm.snippet}"</p>
                    </div>
                    <button
                      onClick={() => onRemoveBookmark(bm.id)}
                      className="p-1.5 text-red-400 hover:bg-red-950/50 rounded-lg transition-all"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="space-y-6">
              {/* Add Intention Form */}
              <form onSubmit={handleAddIntentionSubmit} className="space-y-3 bg-amber-900/30 p-4 rounded-xl border border-amber-700/30">
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  Add New Prayer Intention
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newIntentionText}
                    onChange={(e) => setNewIntentionText(e.target.value)}
                    placeholder="e.g., Peace in family, health for a loved one..."
                    className="flex-1 bg-amber-950/60 border border-amber-700/40 rounded-xl px-3 py-2 text-xs text-amber-100 placeholder:opacity-50 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="bg-amber-950/60 border border-amber-700/40 rounded-xl px-2 py-2 text-xs text-amber-200 focus:outline-none"
                  >
                    <option value="personal">Personal</option>
                    <option value="family">Family</option>
                    <option value="sick">Sick & Suffering</option>
                    <option value="church">Church</option>
                    <option value="world">World Peace</option>
                  </select>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </form>

              {/* List of Intentions */}
              {intentions.length === 0 ? (
                <div className="text-center py-8 opacity-60">
                  <p className="font-serif italic">No prayer intentions recorded.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {intentions.map((it) => (
                    <div
                      key={it.id}
                      className="p-3.5 rounded-xl bg-amber-900/20 border border-amber-800/20 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <Heart className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-amber-100">{it.text}</p>
                          <span className="text-[10px] uppercase tracking-wider text-amber-400 opacity-70">
                            {it.category}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveIntention(it.id)}
                        className="p-1 text-red-400 hover:bg-red-950/50 rounded-lg transition-all"
                        title="Remove intention"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
