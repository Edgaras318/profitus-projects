# Profitus Projects

<div align="center">

![Profitus Logo](https://ss.profitus.lt/static/media/logo-light.4953d15530c6b1fccefaff71ba1c275a.svg)

**A modern, responsive React application for managing investment projects**

[![React](https://img.shields.io/badge/React-19.1.1-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)

[Features](#-features) • [Getting Started](#-getting-started) • [Documentation](#-documentation) • [Tech Stack](#-tech-stack)

</div>

---

## 📖 About

Profitus Projects is a cutting-edge web application built with React and TypeScript that provides a comprehensive platform for browsing, filtering, and managing investment projects. The application connects to the Profitus API to deliver real-time project data with advanced filtering, sorting, and pagination capabilities.

### ✨ Key Features

- 🔍 **Advanced Filtering** - Filter projects by multiple criteria including status, loan ratio, security measures, and more
- 📊 **Dynamic Sorting** - Sort by interest rate, rating, duration, and other key metrics
- 📱 **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and optimized production builds
- 🎨 **Modern UI** - Clean, intuitive interface with smooth animations and transitions
- 🔐 **Type Safety** - Full TypeScript implementation for robust code quality
- 🌐 **API Integration** - Seamless integration with Profitus API endpoints
- ♿ **Accessibility** - WCAG compliant with semantic HTML and ARIA labels

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | ≥ 18.0.0 | [nodejs.org](https://nodejs.org/) |
| **npm** | ≥ 8.0.0 | Included with Node.js |

**Verify installations:**
```bash
node --version  # Should output v18.0.0 or higher
npm --version   # Should output v8.0.0 or higher
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Edgaras318/profitus-projects.git
   cd profitus-projects
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

   Update with your configuration:
   ```env
   # API Configuration
   VITE_API_BASE_URL=https://api.profitus.com/api/v1
   VITE_API_KEY=your_api_key_here
   
   # Feature Flags
   VITE_ENABLE_ANALYTICS=false
   VITE_ENABLE_DEBUG=true
   
   # Application Settings
   VITE_APP_NAME=Profitus Projects
   VITE_DEFAULT_PAGE_SIZE=10
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR at http://localhost:5173 |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run type-check` | Run TypeScript compiler without emitting files |
| `npm run type-check:watch` | Run TypeScript compiler in watch mode |

---

## 🏗️ Project Structure

```
profitus-projects/
├── public/              # Static assets
├── src/
│   ├── api/            # API integration layer
│   ├── components/     # React components
│   │   ├── common/    # Reusable components
│   │   └── features/  # Feature-specific components
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── styles/        # Global styles and SASS modules
│   ├── App.tsx        # Root component
│   └── main.tsx       # Application entry point
├── .env.example       # Environment variables template
├── eslint.config.js   # ESLint configuration
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
└── package.json       # Project dependencies
```

---

## 💻 Development Workflow

### 1. Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` with:
- ⚡ Instant hot-module replacement (HMR)
- 🔍 Real-time error reporting
- 📊 Development build with source maps

### 2. Type Checking

Run TypeScript type checking in watch mode:

```bash
npm run type-check:watch
```

This helps catch type errors during development without blocking the dev server.

### 3. Code Quality

Before committing changes:

```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix

# Type check
npm run type-check
```

### 4. Building for Production

Create an optimized production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory with:
- 📦 Code splitting and tree shaking
- 🗜️ Minified and compressed assets
- 🚀 Optimized for performance

Preview the production build:

```bash
npm run preview
```

---

## 🔧 Configuration

### Vite Configuration

The `vite.config.ts` file controls:
- Build optimization settings
- Development server configuration
- Plugin setup and options
- Path aliases for cleaner imports

### TypeScript Configuration

Multiple TypeScript configurations for different contexts:
- **`tsconfig.json`** - Base configuration
- **`tsconfig.app.json`** - Application-specific settings
- **`tsconfig.node.json`** - Node.js environment settings

### ESLint Configuration

Code quality rules are defined in `eslint.config.js`. Customize linting rules to match your team's coding standards.

---

## 🌐 API Integration

### Endpoints

**Projects Endpoint:**
```
GET https://api.profitus.com/api/v1/landing/projects
```

**Query Parameters:**
- `page` - Page number for pagination
- `limit` - Number of items per page
- `sort[]` - Sorting criteria (e.g., `basic_interest`, `initial_rating`)
- `search` - Search query string
- `filters[]` - Array of filter conditions

**Example Request:**
```javascript
// Sort by interest rate, filter by credit duration
const url = new URL('https://api.profitus.com/api/v1/landing/projects');
url.searchParams.append('page', '1');
url.searchParams.append('limit', '10');
url.searchParams.append('sort[]', JSON.stringify({ 
  id: 'basic_interest', 
  desc: false 
}));
url.searchParams.append('filters[]', JSON.stringify({
  id: 'credit_duration',
  value: { min: 3, max: 6 }
}));
```

---

## 🛠️ Tech Stack

### Core Technologies
- **[React 19.1.1](https://react.dev/)** - UI library with modern features
- **[TypeScript 5.8.3](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite 7.1.7](https://vitejs.dev/)** - Next-generation build tool

### Development Tools
- **[ESLint 9.36.0](https://eslint.org/)** - Code linting and quality
- **[SASS 1.93.1](https://sass-lang.com/)** - CSS preprocessing

### Libraries & Utilities
- **[Axios 1.12.2](https://axios-http.com/)** - Promise-based HTTP client
- **[Lucide React 0.544.0](https://lucide.dev/)** - Beautiful icon library

---

## 🐛 Troubleshooting

### Common Issues

<details>
<summary><strong>Port 5173 already in use</strong></summary>

```bash
# Kill process on port 5173
npx kill-port 5173

# Or start on a different port
npm run dev -- --port 3000
```
</details>

<details>
<summary><strong>Module resolution errors</strong></summary>

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```
</details>

<details>
<summary><strong>Build failures</strong></summary>

```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Clear build artifacts
rm -rf dist

# Rebuild
npm run build
```
</details>

<details>
<summary><strong>TypeScript errors in IDE</strong></summary>

- Restart TypeScript server in your IDE
- Clear TypeScript cache: `rm -rf node_modules/.cache/typescript`
- Ensure you're using the workspace TypeScript version
</details>

<details>
<summary><strong>API connection issues</strong></summary>

- Verify your `.env` file has correct API credentials
- Check API endpoint URLs are properly configured
- Ensure CORS is properly configured on the API server
- Check browser console for detailed error messages
</details>

---

## 📚 Additional Resources

- 📖 [Vite Documentation](https://vitejs.dev/)
- ⚛️ [React Documentation](https://react.dev/)
- 📘 [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- 🎨 [SASS Documentation](https://sass-lang.com/documentation/)
- ✅ [ESLint Rules](https://eslint.org/docs/rules/)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

---

## 📝 License

This project is **private and proprietary**. All rights reserved.

---

<div align="center">

**Built with ❤️ by the Profitus Team**

[Report Bug](https://github.com/Edgaras318/profitus-projects/issues) • [Request Feature](https://github.com/Edgaras318/profitus-projects/issues)

</div>
