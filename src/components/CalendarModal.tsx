import React, { useState } from 'react';
import { LiturgicalDay } from '../types';
import { getLiturgicalDay } from '../utils/liturgicalCalendar';
import { Calendar as CalendarIcon, X, Check, Award, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onSelectDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate);

  if (!isOpen) return null;

  const liturgicalDay = getLiturgicalDay(selectedDate);

  const prevMonth = () => {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() - 1);
    setCurrentMonth(d);
  };

  const nextMonth = () => {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() + 1);
    setCurrentMonth(d);
  };

  // Generate days in month grid
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysGrid: Array<Date | null> = [];
  for (let i = 0; i < firstDayIndex; i++) {
    daysGrid.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysGrid.push(new Date(year, month, d));
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-amber-950 text-amber-50 border border-amber-600/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-amber-900/60 border-b border-amber-700/40">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-amber-300" />
            <h3 className="font-serif font-bold text-lg">Liturgical Calendar</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-amber-800/50">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Day Overview */}
        <div className="p-5 bg-amber-900/30 border-b border-amber-800/30 space-y-1 font-sans">
          <div className="flex items-center justify-between text-xs text-amber-300 uppercase tracking-widest font-semibold">
            <span>{liturgicalDay.season}</span>
            <span>Psalter Week {liturgicalDay.weekOfPsalter}</span>
          </div>
          <h4 className="font-serif font-bold text-xl text-amber-100">{liturgicalDay.liturgicalTitle}</h4>
          <p className="text-xs text-amber-300/80 italic">
            {liturgicalDay.dayOfWeek}, {liturgicalDay.dateString} • Rank: {liturgicalDay.rank}
          </p>
        </div>

        {/* Month Picker */}
        <div className="p-4 font-sans space-y-4">
          <div className="flex items-center justify-between">
            <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-amber-900/40">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-serif font-bold text-base">
              {monthNames[month]} {year}
            </span>
            <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-amber-900/40">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <span key={d} className="font-bold opacity-60 py-1">
                {d}
              </span>
            ))}
            {daysGrid.map((dateObj, idx) => {
              if (!dateObj) return <div key={idx} />;

              const dayNum = dateObj.getDate();
              const isSelected =
                dateObj.toDateString() === selectedDate.toDateString();
              const dayLit = getLiturgicalDay(dateObj);

              let colorClass = 'hover:bg-amber-900/50 text-amber-200';
              if (dayLit.color === 'purple') colorClass = 'text-purple-300 hover:bg-purple-900/50';
              if (dayLit.color === 'red') colorClass = 'text-red-300 hover:bg-red-900/50';
              if (dayLit.color === 'white') colorClass = 'text-amber-100 hover:bg-amber-800/50';

              return (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectDate(dateObj);
                  }}
                  className={`py-2 rounded-lg transition-all text-xs font-semibold relative ${
                    isSelected
                      ? 'bg-amber-600 text-white font-bold ring-2 ring-amber-400'
                      : colorClass
                  }`}
                >
                  {dayNum}
                  {dayLit.rank === 'Solemnity' && !isSelected && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-amber-900/40 border-t border-amber-700/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-700 hover:bg-amber-600 rounded-xl text-xs font-bold text-amber-50"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
