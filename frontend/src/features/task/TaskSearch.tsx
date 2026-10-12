interface TaskSearchProps {
  /** Current search query. */
  value: string;
  /** Called with the next search query whenever the input changes. */
  onChange: (value: string) => void;
}

const TaskSearch = ({ value, onChange }: TaskSearchProps) => (
  <input
    type="search"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    placeholder="Search tasks or tags..."
    aria-label="Search tasks or tags"
    className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:w-56"
  />
);

export default TaskSearch;