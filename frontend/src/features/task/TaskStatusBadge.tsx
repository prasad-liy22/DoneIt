interface TaskStatusBadgeProps {
  /** Whether the task is completed; renders an "Active" badge when false/omitted. */
  completed?: boolean;
}

const TaskStatusBadge = ({ completed = false }: TaskStatusBadgeProps) => {
  const { badge, label } = completed
    ? { badge: "bg-indigo-100 text-indigo-700", label: "Completed" }
    : { badge: "bg-gray-100 text-gray-600", label: "Active" };

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${badge}`}>{label}</span>
  );
};

export default TaskStatusBadge;