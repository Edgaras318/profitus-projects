# Profitus Projects

A modern React application built with TypeScript, Vite, and cutting-edge web technologies.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0.0 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or alternative package managers:
    - **pnpm**: `npm install -g pnpm`
    - **yarn**: `npm install -g yarn`

Verify your installations:
```bash
node --version  # Should be >= 18.0.0
npm --version   # Should be >= 8.0.0
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Edgaras318/profitus-projects.git
cd profitus-projects
```

### 2. Install Dependencies

Using npm (default):
```bash
npm install
```

Using pnpm:
```bash
pnpm install
```

Using yarn:
```bash
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_KEY=your_api_key_here

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true

# Other Configuration
VITE_APP_NAME=Profitus Projects
```

### 4. Start Development Server

```bash
npm run dev
```

The application will start at [http://localhost:5173](http://localhost:5173)

- The server features hot-module replacement (HMR) for instant updates
- Any changes to source files will automatically reload in the browser

## 📦 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **dev** | `npm run dev` | Start Vite development server with HMR |
| **build** | `npm run build` | Build for production (TypeScript compile + Vite build) |
| **preview** | `npm run preview` | Preview production build locally |
| **lint** | `npm run lint` | Run ESLint to check code quality |
| **type-check** | `npm run type-check` | Run TypeScript compiler without emitting files |
| **type-check:watch** | `npm run type-check:watch` | Run TypeScript compiler in watch mode |


## 🛠️ Development Workflow

### 1. Development Mode

```bash
npm run dev
```
- Opens development server at http://localhost:5173
- Features hot-module replacement for instant updates
- Shows build errors and warnings in the console

### 2. Type Checking

During development, run type checking in a separate terminal:
```bash
npm run type-check:watch
```

### 3. Code Quality

Before committing, ensure code quality:
```bash
# Run linter
npm run lint

# Type check
npm run type-check
```

### 4. Building for Production

```bash
# Create optimized production build
npm run build

# Test production build locally
npm run preview
```

The production build will be generated in the `dist/` directory.

## 🔧 Configuration

### Vite Configuration

Edit `vite.config.ts` to customize:
- Build output
- Development server settings
- Plugin configuration
- Path aliases

### TypeScript Configuration

- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node.js environment settings

### ESLint Configuration

Edit `eslint.config.js` to customize linting rules.

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## 💻 Tech Stack

- **React** (v19.1.1) - UI library
- **TypeScript** (v5.8.3) - Type-safe JavaScript
- **Vite** (v7.1.7) - Build tool and dev server
- **Axios** (v1.12.2) - HTTP client
- **Lucide React** (v0.544.0) - Icon library
- **SASS** (v1.93.1) - CSS preprocessor
- **ESLint** (v9.36.0) - Code linting

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

**Node Modules Issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build Errors**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

**TypeScript Errors**
```bash
# Restart TypeScript service in your IDE
# Or clear TypeScript cache
rm -rf node_modules/.cache/typescript
```

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [ESLint Documentation](https://eslint.org/)


## 📝 License

This project is private and proprietary.
