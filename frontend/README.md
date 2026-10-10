# doneIt Frontend

This is the frontend application for doneIt, a productivity-focused task management app designed to help users organize work, track progress, and stay focused.

## Overview

The frontend provides the user-facing interface for the application, including:

- Task dashboards and lists
- User authentication screens
- Task creation, editing, and completion flows
- Responsive layouts for desktop and mobile devices
- Integration with the backend API

## Tech Stack

This frontend is built with a modern web stack, including:

- React
- TypeScript
- Vite
- CSS or Tailwind CSS
- React Router
- Axios or fetch-based API calls

## Project Structure

```bash
frontend/
├── public/             # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Screen-level views
│   ├── hooks/         # Custom hooks
│   ├── services/      # API integration
│   ├── context/       # App-level state providers
│   ├── styles/        # Global styles and theme
│   ├── App.tsx        # Root app component
│   └── main.tsx       # Application entry point
├── .env.example       # Example environment variables
├── package.json       # Scripts and dependencies
├── vite.config.ts     # Vite configuration
└── README.md          # Project documentation
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local URL shown in the terminal to view the app.

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build locally
npm run lint     # Run lint checks
```

## Environment Variables

Create a `.env.local` file with values such as:

```bash
VITE_API_BASE_URL=http://localhost:5000
```

Adjust the variable names to match your backend configuration.

## Contributing

Contributions are welcome. Please make sure to keep the UI consistent, follow the existing project structure, and validate changes before submitting a pull request.

## License

This project is licensed under the MIT license unless otherwise specified.
