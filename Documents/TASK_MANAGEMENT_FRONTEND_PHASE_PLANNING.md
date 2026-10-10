# Task Management System: Core Task Module

**Mission:** 002: Full-Stack Task Management System  
**Phase:** Core Task Management Frontend  
**Stack:** React, TypeScript, Vite; Tailwind CSS (optional for styling)  
**Development style:** Hand-coded by the developer, with incremental review  
**Status:** ⬜ Not started

## 1. Objective

Build a functional, type-safe task management module in React using mock data initially. Add browser persistence with `localStorage` as an interim step before connecting the module to the Node.js/Express and PostgreSQL backend.

### MVP capabilities

- [ ] Display tasks in a list
- [ ] Create tasks
- [ ] Edit task information
- [ ] Delete tasks with confirmation
- [ ] Change task status (`todo`, `in-progress`, `completed`)
- [ ] Set priority (`low`, `medium`, `high`)
- [ ] Set or clear due dates
- [ ] Search tasks by title
- [ ] Filter tasks by status and priority
- [ ] Show basic statistics (total, pending, completed, overdue)
- [ ] Persist tasks across refreshes (initially in `localStorage`)

**Out of scope for this phase:** login, collaboration, backend APIs, database persistence, notifications, and deployment.

## 2. Architecture and Component Responsibilities

### Page and orchestration

| Component | Responsibility |
|---|---|
| `TaskPage` | Compose the task-management screen; coordinate data, filters, and dialogs |
| `TaskDashboard` | Display summary statistics from current task data |
| `TaskToolbar` | Arrange search, filter, and add-task controls |

### Task features

| Component | Responsibility |
|---|---|
| `TaskList` | Render task collection and empty state |
| `TaskCard` | Present a single task and action controls |
| `TaskForm` | Create/edit form; validate and submit task input |
| `TaskSearch` | Collect search text |
| `TaskFilters` | Select status and priority filters |
| `TaskStatusBadge` | Visual indicator for task status |
| `TaskPriorityBadge` | Visual indicator for task priority |
| `TaskDeleteDialog` | Request confirmation before deletion |

### Shared UI primitives (create only when needed)

`Button`, `Input`, `Select`, `Modal`, `Badge`, `EmptyState`, `LoadingSpinner`.

### Component tree

```text
TaskPage
├── TaskDashboard
├── TaskToolbar
│   ├── TaskSearch
│   ├── TaskFilters
│   └── AddTaskButton
├── TaskList
│   └── TaskCard (repeated)
│       ├── TaskStatusBadge
│       ├── TaskPriorityBadge
│       ├── EditTaskButton
│       └── DeleteTaskButton
├── TaskForm (modal or panel)
└── TaskDeleteDialog
```

## 3. Suggested Project Structure

```text
frontend/
└── src/
    ├── components/
    │   └── ui/
    │       ├── Button.tsx
    │       ├── Input.tsx
    │       ├── Select.tsx
    │       ├── Modal.tsx
    │       └── Badge.tsx
    ├── features/
    │   └── tasks/
    │       ├── components/
    │       │   ├── TaskCard.tsx
    │       │   ├── TaskList.tsx
    │       │   ├── TaskForm.tsx
    │       │   ├── TaskToolbar.tsx
    │       │   ├── TaskSearch.tsx
    │       │   ├── TaskFilters.tsx
    │       │   ├── TaskDashboard.tsx
    │       │   ├── TaskStatusBadge.tsx
    │       │   ├── TaskPriorityBadge.tsx
    │       │   └── TaskDeleteDialog.tsx
    │       ├── hooks/
    │       │   └── useTasks.ts
    │       ├── types/
    │       │   └── task.types.ts
    │       ├── services/
    │       │   └── task.service.ts
    │       ├── data/
    │       │   └── mockTasks.ts
    │       └── pages/
    │           └── TaskPage.tsx
    ├── App.tsx
    └── main.tsx
```

The structure is a target, **not** a requirement to create every file on day one.

## 4. TypeScript Data Contract

File: `features/tasks/types/task.types.ts`

```typescript
export type TaskStatus = "todo" | "in-progress" | "completed";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  projectId: string;
  createdAt: string;
}

export type CreateTaskInput = Pick<
  Task,
  "title" | "description" | "priority" | "dueDate" | "projectId"
>;
```

**Notes:**

- Store dates as ISO 8601 strings, document whether `dueDate` is a calendar date (`YYYY-MM-DD`) or timestamp, and apply that convention consistently.
- IDs can be generated using `crypto.randomUUID()` for browser-only prototypes.
- New tasks can default to `status: "todo"`.
- The final backend may introduce `updatedAt`, ownership, and stronger validation.
- `projectId` assumes each task belongs to an existing project. During standalone frontend development, use a known mock project ID instead of leaving it undefined.

### Typed component contract example

```typescript
interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}
```

## 5. Data Flow and State Ownership

```text
                  TaskPage
                     |
                  useTasks()
                     |
           +---------+---------+
           |                   |
        TaskList             TaskForm
           |                   |
        TaskCard             Submit
           |                   |
           +---------+---------+
                     |
            Update task state
                     |
          Persist to localStorage
                     |
               UI re-renders
```

- `TaskPage` coordinates view state (filters, search text, form/dialog visibility).
- `useTasks` owns the collection and exposes operations to add, edit, delete, and update status.
- Child components receive typed data and callbacks via props.
- `task.service.ts` can later become a boundary for API calls; avoid making presentational components depend directly on storage or network details.
- If using `localStorage`, parse stored JSON defensively, validate its shape, and handle missing/corrupt data without crashing.

## 6. Build Order and Deliverables

| Step | Work | Definition of done |
|---|---|---|
| 01 | `task.types.ts` | Status, priority, task model, and creation input are typed |
| 02 | `mockTasks.ts` | Three realistic tasks match the interface |
| 03 | `TaskCard.tsx` | One task's title, description, status, priority, and deadline render |
| 04 | `TaskList.tsx` | All tasks render with stable keys; empty state appears when needed |
| 05 | `TaskPage.tsx` | First task list screen works using mock tasks |
| 06 | `TaskForm.tsx` | Create/edit mode, controlled fields, and required-title validation |
| 07 | `useTasks.ts` | CRUD/state updates work without mutating arrays or objects |
| 08 | Status & priority badges | Labels are clear and consistent |
| 09 | `TaskSearch` & `TaskFilters` | Search/filter combinations produce expected results |
| 10 | `TaskDeleteDialog` | Task deletion requires confirmation |
| 11 | `TaskDashboard` | Summary counts update after task changes |
| 12 | `localStorage` integration | Tasks survive a page refresh; invalid storage is handled |
| 13 | Tests & quality review | Tests, type-check, lint, and production build pass |

### Suggested increments

- **Increment A, Read-only UI:** Steps 01–05.
- **Increment B, Working CRUD:** Steps 06–08.
- **Increment C, Discoverability and safety:** Steps 09–10.
- **Increment D, Dashboard and persistence:** Steps 11–12.
- **Increment E, Verification:** Step 13.

## 7. Acceptance Criteria

- [ ] A developer can open the task page and see all mock tasks.
- [ ] Task cards display title, description, status, priority, and due date (or "No deadline").
- [ ] New tasks receive an ID, creation timestamp, and default status.
- [ ] Empty or whitespace-only task titles are rejected.
- [ ] Editing changes the intended task without modifying others.
- [ ] Deletion only occurs after confirmation.
- [ ] Search is case-insensitive and checks titles.
- [ ] Status and priority filters can be applied together.
- [ ] Dashboard totals are consistent with the underlying task collection.
- [ ] Overdue means a task's due date has passed **and** its status is not completed.
- [ ] User data persists after refresh when local persistence is enabled.
- [ ] `npx tsc --noEmit` (using the project's TypeScript configuration), the project lint command, and `npm run build` succeed.

## 8. Test Scenarios

1. Create a task with a valid title, priority, and deadline.
2. Try to create a task with an empty title; verify rejection.
3. Update a task title/status/priority; verify changes display immediately.
4. Cancel editing; verify no changes are saved.
5. Cancel deletion; verify the task remains.
6. Confirm deletion; verify the task disappears and the dashboard updates.
7. Search with mixed letter case; verify matching is case-insensitive.
8. Combine a status filter with a priority filter.
9. Refresh the browser; verify task data remains available.
10. Supply malformed local storage data; verify graceful recovery.
11. Check overdue behavior for completed and unfinished tasks.

## 9. Open Design Decisions

| Decision | Proposed default | Status |
|---|---|---|
| Initial storage | Mock data → React state → `localStorage` | Proposed |
| Final persistence | Node.js API + PostgreSQL | Planned later |
| Task/project relationship | Each task belongs to one project | Proposed |
| Deleting a project | Decide cascade, detach, or restrict | Not decided |
| Task deadline representation | `YYYY-MM-DD` date-only string or `null` | Needs confirmation |
| Task form presentation | Modal or side panel | Not decided |
| UI styling | Tailwind CSS | Planned |

## 10. First Coding Assignment

Create only these files:

```text
src/features/tasks/
├── types/task.types.ts
├── data/mockTasks.ts
└── components/TaskCard.tsx
```

1. Define `TaskStatus`, `TaskPriority`, and `Task` in `task.types.ts`.
2. Add **three sample tasks** in `mockTasks.ts` and ensure they satisfy the model.
3. Make a typed `TaskCard` that accepts a `task` prop and renders its information.
4. Temporarily render the three cards from `App.tsx` or an initial `TaskPage.tsx`.
5. Verify the development server and TypeScript build run without errors.

**Working agreement:** Developer writes the implementation; mentor reviews code, discusses tradeoffs, and helps debug. Avoid implementing unrelated features before the current increment works.

---

**Next milestone:** Complete Increment A (read-only typed task list) before adding creation and editing.
