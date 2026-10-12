import TaskFilter from "./TaskFilter";
import type { TaskFilterValue } from "./TaskFilter";

interface TaskToolbarProps {
  /** Optional label shown on the left of the toolbar. */
  title?: string;
  /** Current filter selections (status, priority, and search query). */
  value: TaskFilterValue;
  /** Called with the next filter selections when any control changes. */
  onChange: (value: TaskFilterValue) => void;
}

const TaskToolbar = ({ title, value, onChange }: TaskToolbarProps) => (
  <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
    {title && <span className="text-sm font-medium text-gray-700">{title}</span>}
    <div className="flex flex-1 flex-wrap items-center gap-3 sm:justify-end">
      <TaskFilter value={value} onChange={onChange} />
    </div>
  </div>
);

export default TaskToolbar;