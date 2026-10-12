import Button from "../../components/elements/Button";
import TaskFilter from "./TaskFilter";
import type { TaskFilterValue } from "./TaskFilter";

interface TaskToolbarProps {
  /** Optional label shown on the left of the toolbar. */
  title?: string;
  /** Current filter selections (status, priority, and search query). */
  value: TaskFilterValue;
  /** Called with the next filter selections when any control changes. */
  onChange: (value: TaskFilterValue) => void;
  /** Called when the "Create Task" button is clicked. */
  onCreateTask: () => void;
}

const TaskToolbar = ({value, onChange, onCreateTask }: TaskToolbarProps) => (
  <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-3">
       
      <Button size="sm" className="gap-1.5" onClick={onCreateTask}>
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
        </svg>
        Create Task
      </Button>
    </div>
    <div className="flex flex-1 flex-wrap items-center gap-3 sm:justify-end">
      <TaskFilter value={value} onChange={onChange} />
    </div>
  </div>
);

export default TaskToolbar;