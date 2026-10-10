# Task Management System

> **Mission 002: Full-Stack TypeScript Project**  
> Status: Planning / initial setup  
> Approach: Hands-on development. The developer writes the code; ChatGPT helps with architecture, explanations, review, and debugging.

## 1. Project Overview

Build a full-stack Task Management System in which users organize work into projects, create tasks, prioritize work, set due dates, and monitor progress. Start with a single-user-owned workspace model and add collaboration later.

### Main goals
- Practice production-oriented **TypeScript** on both frontend and backend.
- Apply sound software engineering practices without overcomplicating the MVP.
- Implement, test, and deploy an end-to-end application.
- Maintain a clear, reviewable Git history and repository documentation.

## 2. Technology Stack

| Layer / Tool | Selection |
|---|---|
| Frontend | React + TypeScript |
| Frontend tooling | Vite |
| Styling | Tailwind CSS |
| Linting | Oxlint (selected during frontend setup; confirm local configuration) |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL |
| ORM / migrations | Prisma |
| Request validation | Zod |
| Authentication | JWT-based authentication, secure password hashing |
| API testing | Bruno or Postman |
| Automated testing | Vitest + Supertest |
| Version control | Git + GitHub |
| Deployment | Provider to be decided |

**Engineering defaults:** Enable strict TypeScript checking, use environment variables for secrets, and keep TypeScript and other packages installed at the project level.

## 3. Product Scope

### 3.1 MVP features

**Authentication**
- Register and log in.
- Log out and access protected routes.
- View basic user profile.

**Projects**
- Create, list, update, and delete projects owned by the signed-in user.

**Tasks**
- Create, list, update, and delete tasks within a project.
- Set task title, description, status, priority, and optional due date.
- Filter tasks by status and priority.

**Dashboard**
- Show total, pending, completed, and overdue tasks.

### 3.2 Later enhancements (not MVP)
- Teams and task assignments.
- Kanban board.
- Notifications.
- Advanced search and filtering.
- Activity history.
- Analytics and charts.
- Dark mode.

## 4. Core Data Model (Initial Draft)

### User
| Field | Notes |
|---|---|
| id | Primary key |
| name | Required |
| email | Unique, required |
| passwordHash | Never store plaintext passwords |
| createdAt | Timestamp |

### Project
| Field | Notes |
|---|---|
| id | Primary key |
| name | Required |
| description | Optional |
| ownerId | Foreign key to User |
| createdAt | Timestamp |

### Task
| Field | Notes |
|---|---|
| id | Primary key |
| title | Required |
| description | Optional |
| status | e.g. TODO, IN_PROGRESS, DONE |
| priority | e.g. LOW, MEDIUM, HIGH |
| dueDate | Optional |
| projectId | Foreign key to Project |
| createdAt | Timestamp |

### Relationships

```text
User (1) ─────── (N) Project
Project (1) ──── (N) Task
```

**Open decision:** What happens to tasks when their project is deleted?
- A. Cascade-delete tasks.
- B. Keep tasks and remove project association (requires changing the data model).
- C. Prevent project deletion until its tasks have been removed.

Choose and document the behavior before finalizing database migrations.

## 5. Proposed API Contract (Draft)

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Log in |
| GET | `/api/projects` | List owned projects |
| POST | `/api/projects` | Create project |
| PATCH | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| GET | `/api/projects/:id/tasks` | List project tasks |
| POST | `/api/projects/:id/tasks` | Create task |
| PATCH | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

**Security rule:** Every route that reads or changes private projects/tasks must verify the authenticated user's ownership or authorization.

## 6. Proposed Repository Structure

```text
task-management-system/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── app.ts
│   ├── package.json
│   └── tsconfig.json
├── README.md
└── .gitignore
```

Directory naming may evolve as requirements become clearer.

## 7. Implementation Roadmap

| Phase | Focus | Deliverable | Status |
|---|---|---|---|
| 01 | Requirements and architecture | Scope, entities, relations, architecture | ⬜ In progress |
| 02 | Project setup | React frontend, Express backend, tooling | ⬜ Frontend initialized; backend pending |
| 03 | Database design | PostgreSQL + Prisma schema and migrations | ⬜ Not started |
| 04 | Backend foundation | Express API structure, config, error handling | ⬜ Not started |
| 05 | Authentication | Registration, login, protected API access | ⬜ Not started |
| 06 | Project management | Project CRUD API | ⬜ Not started |
| 07 | Task management | Task CRUD API, statuses, priorities | ⬜ Not started |
| 08 | Frontend integration | API integration, auth, projects, tasks | ⬜ Not started |
| 09 | Dashboard and UX | Counters, filtering, loading/error states | ⬜ Not started |
| 10 | Testing and security | Unit/integration tests, authorization review | ⬜ Not started |
| 11 | Deployment | Hosted frontend/backend/database, docs | ⬜ Not started |

> Tests should be added **throughout** development, not deferred entirely until Phase 10.

## 8. Architecture Overview

```text
React + TypeScript (Vite)
          │ HTTP/JSON
          ▼
Express routes
          ▼
Validation + authentication/authorization
          ▼
Controllers
          ▼
Services / business logic
          ▼
Prisma ORM
          ▼
PostgreSQL
```

## 9. Quality and Security Checklist

- [ ] Strict TypeScript configured for frontend and backend.
- [ ] Linting and consistent formatting configured.
- [ ] Request payloads validated with Zod.
- [ ] Passwords hashed using a suitable modern password hashing algorithm.
- [ ] JWT/session storage and logout behavior deliberately designed.
- [ ] Secrets kept out of source control; `.env.example` documented.
- [ ] Users cannot access each other's projects or tasks.
- [ ] API returns consistent status codes and error responses.
- [ ] Loading, empty, and error states handled on the frontend.
- [ ] Database migrations reproducible.
- [ ] Unit and API integration tests pass.
- [ ] Production builds succeed.
- [ ] README includes setup, environment, database migration, and run instructions.

## 10. Development Method

For every feature:

1. **Learn:** Understand the underlying TypeScript and design concepts.
2. **Plan:** Agree on requirements, API contract, and acceptance criteria.
3. **Implement:** Developer writes the code manually.
4. **Review:** Review functionality, readability, types, security, and maintainability.
5. **Verify:** Run tests and check acceptance criteria.
6. **Commit:** Make a meaningful Git commit.

## 11. Immediate Next Actions

- [ ] Finalize project-deletion behavior (cascade / detach / restrict).
- [ ] Confirm exact installed versions of Node.js, npm, and PostgreSQL.
- [ ] Verify the React + TypeScript/Vite frontend starts successfully.
- [ ] Initialize backend package and strict TypeScript configuration.
- [ ] Create an initial Prisma schema from the approved entities.
- [ ] Define response/error formats and authentication approach before implementing endpoints.

## 12. Decision Log

| Decision | Current position |
|---|---|
| Development approach | Hand-coded, mentor-assisted |
| Frontend | React + TypeScript + Vite |
| Backend | Express + TypeScript |
| Persistence | PostgreSQL with Prisma |
| MVP tenancy | Projects owned by individual users |
| Project deletion rule | **Pending decision** |
| Deployment provider | **Pending decision** |
| Additional collaboration features | Post-MVP |

---

_Last updated: 2026-10-10. This is a living project plan; revise it as engineering decisions are made._
