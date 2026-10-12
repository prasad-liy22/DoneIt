import { useEffect, useRef, useState } from "react";
import Calendar from "./Calendar";

interface DatePickerProps {
  /** Selected date in ISO format (YYYY-MM-DD), or null for no selection. */
  value?: string | null;
  /** Called with the picked date as ISO YYYY-MM-DD, or null when cleared. */
  onChange: (date: string | null) => void;
  /** Text shown when no date is selected. Defaults to "No due date". */
  placeholder?: string;
  /** Extra classes for the outermost container. */
  className?: string;
}

const DatePicker = ({
  value,
  onChange,
  placeholder = "No due date",
  className,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="flex w-full items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-left text-xs transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      >
        <svg
          className="h-3.5 w-3.5 shrink-0 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value ?? placeholder}
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-1">
          <Calendar
            value={value ?? null}
            onSelect={(date) => {
              onChange(date);
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;