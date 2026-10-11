import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskEditPopup from "./TaskEditPopup";
import TaskToolbar from "./TaskToolbar";
import type { TaskCardProps } from "./TaskCard";

export interface Task extends TaskCardProps {
  id: string;
}

interface TaskListProps {
  initialTasks?: Task[];
}

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

const TaskList = ({ initialTasks = sampleTasks }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
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
      <TaskToolbar title="Tasks">
        {/* Placeholder tools — swap with TaskFilter / TaskSearch once implemented */}
        <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1">
          {["All", "Active", "Completed"].map((label) => (
            <button
              key={label}
              type="button"
              disabled
              className="cursor-not-allowed rounded-md px-3 py-1 text-sm font-medium text-gray-400"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            disabled
            placeholder="Search tasks or tags..."
            className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-400 sm:w-56"
          />
          <select
            disabled
            className="cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-400"
          >
            <option>All priorities</option>
          </select>
        </div>
      </TaskToolbar>

      <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
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