import type { Priority } from "./TaskCard";

interface TaskPriorityBadgeProps {
  /** Task priority; defaults to "medium" when omitted. */
  priority?: Priority;
}

const priorityStyles: Record<Priority, { badge: string; label: string }> = {
  low: { badge: "bg-emerald-100 text-emerald-700", label: "Low" },
  medium: { badge: "bg-amber-100 text-amber-700", label: "Medium" },
  high: { badge: "bg-rose-100 text-rose-700", label: "High" },
};

const TaskPriorityBadge = ({ priority = "medium" }: TaskPriorityBadgeProps) => {
  const styles = priorityStyles[priority];

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles.badge}`}>
      {styles.label}
    </span>
  );
};

export default TaskPriorityBadge;