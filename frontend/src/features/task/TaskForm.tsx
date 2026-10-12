import { useEffect, useState } from "react";
import DatePicker from "../../components/elements/DatePicker";
import type { Priority, TaskCardProps } from "./TaskCard";

interface TaskFormProps {
  /** When provided, the form edits this task; otherwise it creates a new one. */
  task?: TaskCardProps;
  /** Called with the submitted task values. */
  onSubmit: (values: TaskCardProps) => void;
  /** Called when the user cancels or closes the form. */
  onClose: () => void;
}

const priorityOptions: Priority[] = ["low", "medium", "high"];

const TaskForm = ({ task, onSubmit, onClose }: TaskFormProps) => {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [priority, setPriority] = useState<Priority>(task?.priority ?? "medium");
  const [dueDate, setDueDate] = useState(task?.dueDate ?? "");
  const [tags, setTags] = useState((task?.tags ?? []).join(", "));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Title is required.");
      return;
    }
    onSubmit({
      title: trimmedTitle,
      description: description.trim() || undefined,
      priority,
      dueDate: dueDate.trim() || undefined,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      completed: task?.completed ?? false,
    });
  };

  const inputClass =
    "rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-xl bg-white p-5 text-left shadow-xl"
      >
        <h2 className="mb-4 text-lg font-semibold text-black">
          {task ? "Edit task" : "Create task"}
        </h2>

        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            Title
            <input
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                if (error) setError(null);
              }}
              placeholder="What needs to be done?"
              autoFocus
              className={inputClass}
            />
            {error && <span className="text-xs font-normal text-rose-600">{error}</span>}
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            Description
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              placeholder="Add more detail (optional)"
              className={`resize-none ${inputClass}`}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            Priority
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value as Priority)}
              className={inputClass}
            >
              {priorityOptions.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            Due date
            <DatePicker value={dueDate || null} onChange={(date) => setDueDate(date ?? "")} />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            Tags
            <input
              type="text"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="Comma separated"
              className={inputClass}
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {task ? "Save" : "Create task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;