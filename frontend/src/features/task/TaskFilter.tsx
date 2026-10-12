import TaskSearch from "./TaskSearch";
import type { Priority } from "./TaskCard";

export type StatusFilter = "all" | "active" | "completed";
export type PriorityFilter = "all" | Priority;

export interface TaskFilterValue {
  status: StatusFilter;
  priority: PriorityFilter;
  query: string;
}

interface TaskFilterProps {
  /** Current filter selections. */
  value: TaskFilterValue;
  /** Called with the next filter selections when any control changes. */
  onChange: (value: TaskFilterValue) => void;
}

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

const priorityFilters: { value: PriorityFilter; label: string }[] = [
  { value: "all", label: "All priorities" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const TaskFilter = ({ value, onChange }: TaskFilterProps) => {
  const update = (patch: Partial<TaskFilterValue>) => onChange({ ...value, ...patch });

  return (
    <>
      <div role="group" aria-label="Filter by status" className="flex items-center gap-1 rounded-lg bg-gray-100 p-1">
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => update({ status: filter.value })}
            aria-pressed={value.status === filter.value}
            className={`rounded-md px-3 py-1 text-sm font-medium transition ${
              value.status === filter.value
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <TaskSearch value={value.query} onChange={(query) => update({ query })} />
        <select
          value={value.priority}
          onChange={(event) => update({ priority: event.target.value as PriorityFilter })}
          aria-label="Filter by priority"
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          {priorityFilters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default TaskFilter;
