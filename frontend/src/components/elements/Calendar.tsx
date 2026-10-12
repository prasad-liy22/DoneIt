import { useState } from "react";

interface CalendarProps {
  /** Selected date in ISO format (YYYY-MM-DD), or null for no selection. */
  value?: string | null;
  /** Called with the picked date as ISO YYYY-MM-DD, or null when cleared. */
  onSelect: (date: string | null) => void;
}

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const toISODate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseISODate = (value?: string | null): Date | null => {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  return new Date(year, month, day);
};

const Calendar = ({ value, onSelect }: CalendarProps) => {
  const [viewDate, setViewDate] = useState<Date>(parseISODate(value) ?? new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const todayISO = toISODate(new Date());

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const goToMonth = (offset: number) => {
    setViewDate(new Date(year, month + offset, 1));
  };

  return (
    <div className="w-60 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => goToMonth(-1)}
          aria-label="Previous month"
          className="rounded-md p-0.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <span className="text-xs font-semibold text-gray-900">
          {MONTH_NAMES[month]} {year}
        </span>

        <button
          type="button"
          onClick={() => goToMonth(1)}
          aria-label="Next month"
          className="rounded-md p-0.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="mt-2 grid grid-cols-7 text-center text-[10px] font-medium text-gray-400">
        {WEEKDAY_LABELS.map((label) => (
          <span key={label} className="py-0.5">
            {label}
          </span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, index) => {
          if (day === null) return <span key={`empty-${index}`} />;

          const iso = toISODate(new Date(year, month, day));
          const isSelected = iso === value;
          const isToday = iso === todayISO;

          return (
            <button
              key={iso}
              type="button"
              onClick={() => onSelect(iso)}
              aria-label={`${MONTH_NAMES[month]} ${day}, ${year}`}
              aria-pressed={isSelected}
              className={`h-7 w-7 rounded-md text-xs transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                isSelected
                  ? "bg-indigo-600 font-medium text-white"
                  : isToday
                    ? "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                    : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-1.5 flex justify-end border-t border-gray-100 pt-1.5">
        <button
          type="button"
          onClick={() => onSelect(null)}
          className="rounded-md px-1.5 py-0.5 text-[11px] font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Calendar;