import { useState } from "react";
import TaskDeleteDialog from "./TaskDeleteDialog";
import TaskPriorityBadge from "./TaskPriorityBadge";

export type Priority = "low" | "medium" | "high";

export interface TaskCardProps {
  title: string;
  description?: string;
  priority?: Priority;
  dueDate?: string;
  tags?: string[];
  completed?: boolean;
  onToggle?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const flagStyles: Record<Priority, string> = {
  low: "bg-emerald-500",
  medium: "bg-amber-500",
  high: "bg-rose-500",
};

const TaskCard = ({
  title,
  description,
  priority = "medium",
  dueDate,
  tags = [],
  completed = false,
  onToggle,
  onEdit,
  onDelete,
}: TaskCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleConfirmDelete = () => {
    setShowDeleteDialog(false);
    onDelete?.();
  };

  return (
    <>
    <div
      tabIndex={0}
      className="taskCard group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-gray-200 bg-white p-4 text-left shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
    >
      <span className={`absolute inset-y-0 left-0 w-1 ${flagStyles[priority]}`} />

      <div className="flex items-start justify-between gap-3 pl-2">
        <div className="flex items-start gap-3">
          <span className="relative mt-0.5 inline-flex h-5 w-5 shrink-0 opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
            <input
              id={`task-${title}`}
              type="checkbox"
              checked={completed}
              onChange={onToggle}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white transition checked:border-indigo-600 checked:bg-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            />
            <svg
              className="pointer-events-none absolute inset-0 m-auto h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <div>
            <label
              htmlFor={`task-${title}`}
              className={`block cursor-pointer font-medium leading-snug ${
                completed ? "text-gray-400 line-through" : "text-gray-900"
              }`}
            >
              {title}
            </label>
            {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
          <button
            type="button"
            onClick={onEdit}
            aria-label="Edit task"
            className="rounded-md p-1 text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setShowDeleteDialog(true)}
            aria-label="Delete task"
            className="rounded-md p-1 text-gray-400 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 pl-2">
        <TaskPriorityBadge priority={priority} />

        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
          >
            #{tag}
          </span>
        ))}

        {dueDate && (
          <span className="ml-auto inline-flex items-center gap-1 text-xs text-gray-500">
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            {dueDate}
          </span>
        )}
      </div>
    </div>

    {showDeleteDialog && (
      <TaskDeleteDialog
        title={title}
        onConfirm={handleConfirmDelete}
        onClose={() => setShowDeleteDialog(false)}
      />
    )}
    </>
  );
};

export default TaskCard;
