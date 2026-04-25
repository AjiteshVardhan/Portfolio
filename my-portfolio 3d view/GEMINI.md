# Gemini Project Context: My Portfolio

This project is a high-performance, visually rich personal portfolio website for Ajitesh Vardhan, a Mechanical Engineering student at Loughborough University.

## Project Overview
- **Purpose:** Showcase engineering projects, technical skills, and professional background to potential employers.
- **Stack:** 
  - **Framework:** React 19 (JavaScript)
  - **Build Tool:** Vite 8
  - **Styling:** Tailwind CSS 4 (using `@tailwindcss/vite` plugin)
  - **Icons:** Lucide React
  - **Fonts:** Inter (Sans), JetBrains Mono (Monospace)
- **Architecture:** Currently utilizes a monolithic approach where the primary logic, components (Hero, Projects, Skills, Contact), and project data are co-located in `src/App.jsx`.

## Building and Running
- `npm run dev`: Starts the local development server (Vite).
- `npm run build`: Generates a production-ready build in the `dist/` directory.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Executes ESLint to verify code quality.

## Development Conventions
- **Component Structure:**
  - Components like `Nav`, `Hero`, `Projects`, `Skills`, and `Contact` are defined as functional components within `src/App.jsx`.
  - UI Atoms (e.g., `SectionLabel`, `StatusPip`) are used for consistent styling.
- **Data Management:** 
  - Project data is stored in the `PROJECTS_RAW` array within `src/App.jsx`.
  - Skill categories and highlights are stored in `skillsCategories` and `skillHighlights`.
- **Styling & Animations:**
  - Tailwind CSS 4 utility classes are used for layout and styling.
  - Custom animations (`fadeUp`, `modalIn`) are defined in `src/index.css`.
  - Responsive design is prioritized (using `sm:`, `md:`, `lg:` prefixes).
- **Media Assets:**
  - **Images:** Stored in `public/images/`.
  - **Documents:** Stored in `public/Docs/`.
  - **Favicon:** Uses `public/favicon.svg` and `public/Web-logo.png`.
- **Interactive Features:**
  - `useScrollReveal`: A custom hook using `IntersectionObserver` for fade-in effects.
  - Smooth scrolling navigation using `scrollIntoView`.
  - Dynamic `ProjectModal` for detailed project views with image gallery and code syntax highlighting.

## Key Files
- `index.html`: Main entry point, contains metadata, title, and favicon links.
- `src/main.jsx`: React root initialization.
- `src/App.jsx`: Main application logic, data, and component definitions.
- `src/index.css`: Tailwind imports, global theme configuration, and custom animations.
- `vite.config.js`: Vite configuration with React and Tailwind plugins.
- `public/`: Contains static assets like the CV, project images, and favicons.
