import { useEffect } from "react";

interface TaskDeleteDialogProps {
  title: string;
  onConfirm: () => void;
  onClose: () => void;
}

const TaskDeleteDialog = ({ title, onConfirm, onClose }: TaskDeleteDialogProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-task-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-xl bg-white p-5 text-left shadow-xl"
      >
        <h2 id="delete-task-title" className="text-lg font-semibold text-gray-900">
          Delete task?
        </h2>
        <p className="mt-2 text-sm text-gray-600!">
          Are you sure you want to delete{" "}
          <span className="font-medium text-gray-900">{title}</span>? This action cannot be undone.
        </p>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            autoFocus
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDeleteDialog;
