import { useMemo, useState } from "react";
import TaskCard from "./taskCard";
import TaskEditPopup from "./taskEditPopup";
import type { Priority, TaskCardProps } from "./taskCard";

export interface Task extends TaskCardProps {
  id: string;
}

interface TaskListProps {
  initialTasks?: Task[];
}

type StatusFilter = "all" | "active" | "completed";
type PriorityFilter = "all" | Priority;

const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Design the task board",
    description: "Lay out columns and card styles.",
    priority: "high",
    dueDate: "Oct 15",
    tags: ["design", "ui"],
  },
  {
    id: "2",
    title: "Wire up drag and drop",
    description: "Move cards between columns.",
    priority: "medium",
    dueDate: "Oct 18",
    tags: ["frontend"],
  },
  {
    id: "3",
    title: "Write API tests",
    description: "Cover create, update and delete.",
    priority: "low",
    tags: ["backend", "tests"],
  },
  {
    id: "4",
    title: "Set up CI pipeline",
    priority: "high",
    dueDate: "Oct 12",
    tags: ["devops"],
    completed: true,
  },
];

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

const priorityFilters: { value: PriorityFilter; label: string }[] = [
  { value: "all", label: "All priorities" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const TaskList = ({ initialTasks = sampleTasks }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [priority, setPriority] = useState<PriorityFilter>("all");
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = (id: string, values: TaskCardProps) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...values } : task)));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = useMemo(() => {
    const search = query.trim().toLowerCase();
    return tasks.filter((task) => {
      if (status === "active" && task.completed) return false;
      if (status === "completed" && !task.completed) return false;
      if (priority !== "all" && (task.priority ?? "medium") !== priority) return false;
      if (search) {
        const haystack = [task.title, task.description ?? "", ...(task.tags ?? [])]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      return true;
    });
  }, [tasks, status, priority, query]);

  const editingTask = tasks.find((task) => task.id === editingId) ?? null;

  if (tasks.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-400">
        No tasks yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setStatus(filter.value)}
              className={`rounded-md px-3 py-1 text-sm font-medium transition ${
                status === filter.value
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tasks or tags..."
            className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:w-56"
          />
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value as PriorityFilter)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            {priorityFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-400">
          No tasks match your filters.
        </p>
      ) : (
        <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <TaskCard
                {...task}
                onToggle={() => handleToggle(task.id)}
                onEdit={() => handleEdit(task.id)}
                onDelete={() => handleDelete(task.id)}
              />
            </li>
          ))}
        </ul>
      )}

      {editingTask && (
        <TaskEditPopup
          task={editingTask}
          onSave={(values) => handleSave(editingTask.id, values)}
          onClose={() => setEditingId(null)}
        />
      )}
    </div>
  );
};

export default TaskList;
