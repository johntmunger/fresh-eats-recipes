# Fresh & Fast Finds

Full-stack recipe and ingredient management application with Vue.js 3 frontend and Express.js backend, featuring SQLite database persistence.

A beautiful, modern web app to manage your shopping ingredients and save your favorite recipe combinations.

## 🚀 <a href="https://fresh-finds-recipes.onrender.com/" target="_blank" rel="noopener noreferrer">Live Demo</a>

**Try it now:** <a href="https://fresh-finds-recipes.onrender.com/" target="_blank" rel="noopener noreferrer">https://fresh-finds-recipes.onrender.com/</a>

> **Note:** The app is hosted on Render's free tier and may take 30-60 seconds to wake up on first load.

## Features

### Core Functionality

- 🛒 **Ingredient Management** - Add, edit, and delete ingredients with inline editing
- 📝 **Recipe Saving** - Save current ingredient combinations as named recipes
- 💾 **Recipe Library** - Browse and load previously saved recipes
- 🔄 **Smart Duplicate Detection** - Prevents saving duplicate recipes
- 📊 **Live Statistics** - Track ingredient count and saved recipe count
- 💾 **SQLite Database Persistence** - All data saved to database
- 🔄 **RESTful API** - Express.js backend with proper error handling
- ⚡ **Optimistic Updates** - Instant UI feedback with background sync

### Design & UX

- ☀️ **Beautiful Light Mode** - Clean, modern design with prominent background imagery
- 🖼️ **Dynamic Backgrounds** - Rotating collection of bright kitchen/restaurant images
- 📱 **Mobile-First Responsive** - Optimized for all screen sizes from mobile to desktop
- ✨ **Smooth Animations** - Subtle transitions throughout the interface
- 🎯 **Interactive Hover Effects** - Responsive feedback on all interactive elements
- 💫 **Micro-interactions** - Button scaling, dropdown animations
- 🌿 **Green Theme** - Fresh, natural color palette throughout
- 🔍 **Smart Validation** - Intelligent prevention of saving default/duplicate recipes

### User Experience

- **Two-Column Layout** - Efficient ingredient display with space for more items
- **Inline Editing** - Edit ingredients directly in place (save with Enter or blur)
- **Modal Dialogs** - Beautiful save recipe and delete confirmation modals
- **Click-Away Detection** - Dropdowns close when clicking outside
- **Current Recipe Display** - Shows active recipe name with edit/delete options
- **Helpful Messages** - Contextual feedback for user actions

### Technical Features

- 🔷 Fully typed with TypeScript
- ⚡ Built with Vue 3 Composition API
- 🎪 Icon-rich interface with Iconify
- 🎨 Advanced Tailwind CSS styling
- 📦 Lightweight and performant
- 🗄️ SQLite database with better-sqlite3
- 🔌 RESTful API architecture
- 🔄 Real-time error handling and loading states

## Tech Stack

### Frontend

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Iconify** - Comprehensive icon library with Material Design Icons

### Backend

- **Express.js** - Web framework for Node.js
- **SQLite** - Lightweight embedded database
- **better-sqlite3** - Fast, synchronous SQLite client
- **CORS** - Cross-Origin Resource Sharing support

### Code Quality & Formatting

- **Prettier** - Automatic code formatting on save
- **ESLint** - Code linting with TypeScript and Vue support
- **eslint-config-prettier** - Zero conflicts between ESLint and Prettier
- **Format-on-save** - Automatic formatting and linting in VS Code/Cursor

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start both frontend and backend servers:

```bash
npm run dev
```

This will start:

- **Backend API** on `http://localhost:3001`
- **Frontend App** on `http://localhost:5173`

3. Open your browser and navigate to `http://localhost:5173`

The app comes pre-loaded with 6 starter ingredients: Tomatoes, Garlic, Olive Oil, Basil, Onions, and Chicken Breast.

### Code Formatting & Linting

This project is configured with **Prettier** and **ESLint** for automatic code formatting and linting:

#### Automatic (on save)

- Format-on-save is enabled for `.ts`, `.tsx`, and `.vue` files
- Prettier formats your code (spacing, quotes, semicolons, etc.)
- ESLint auto-fixes linting issues (unused imports, etc.)

#### Manual Commands

```bash
# Format all files
npm run format

# Check formatting without changes
npm run format:check

# Lint all files
npm run lint

# Lint and auto-fix issues
npm run lint:fix
```

#### Configuration Files

- `.prettierrc` - Prettier settings (double quotes, 2-space tabs, etc.)
- `.prettierignore` - Files to exclude from formatting
- `eslint.config.js` - ESLint rules with TypeScript & Vue support
- `.vscode/settings.json` - Editor settings for format-on-save

## Usage Guide

### Adding Ingredients

1. Type an ingredient name in the input field
2. Click "Add Ingredient" (or press Enter)
3. Ingredient appears in the two-column list below

### Editing Ingredients

1. Hover over an ingredient item
2. Click the small pencil (edit) icon that appears
3. Modify the text inline
4. Press Enter or click away to save

### Deleting Ingredients

1. Hover over an ingredient item
2. Click the small trash (delete) icon that appears
3. Ingredient is removed immediately

### Saving a Recipe

1. Add or modify ingredients to your liking
2. Click "Save Recipe" button (disabled for default starter ingredients)
3. Enter a recipe name in the modal dialog
4. Review the ingredient list
5. Click "Save Recipe" to persist to database
6. Ingredients are cleared after successful save

### Loading Saved Recipes

1. Click "Saved Recipes" button
2. Dropdown menu appears with all saved recipes
3. Click any recipe to load its ingredients
4. Current ingredient list is replaced with recipe ingredients

### Managing Recipes

- **Edit Recipe Name**: Hover over recipe name, click pencil icon, edit inline
- **Delete Recipe**: Hover over recipe name, click trash icon, confirm deletion

## Project Structure

```
├── server/                  # Backend API
│   ├── db/
│   │   ├── init.js         # Database initialization
│   │   ├── schema.sql      # Database schema (ingredients, recipes, recipe_ingredients)
│   │   └── recipes.db      # SQLite database (auto-generated)
│   ├── routes/
│   │   ├── ingredients.js  # Ingredient CRUD endpoints
│   │   └── recipes.js      # Recipe CRUD endpoints
│   ├── index.js            # Express server setup
│   └── README.md           # Backend documentation
│
├── src/                     # Frontend application
│   ├── components/
│   │   ├── IngredientInput.vue      # Input component for adding ingredients
│   │   ├── IngredientItem.vue       # Individual ingredient with edit/delete
│   │   ├── IngredientList.vue       # Two-column grid layout
│   │   ├── CurrentRecipeDisplay.vue # Shows current recipe name
│   │   ├── SaveRecipeModal.vue      # Modal for saving recipes
│   │   └── DeleteConfirmModal.vue   # Confirmation for recipe deletion
│   ├── services/
│   │   └── api.ts          # API service layer
│   ├── types/
│   │   └── ingredient.ts   # TypeScript type definitions
│   ├── App.vue             # Main app component
│   ├── main.ts             # Application entry point
│   └── style.css           # Tailwind CSS + custom animations
│
├── public/
│   └── basket-icon.svg     # Shopping basket favicon
│
├── documentation/           # Project documentation
├── vite.config.ts          # Vite configuration with proxy
└── package.json            # Dependencies and scripts
```

## Component Overview

### IngredientInput

- Clean input field with green focus states
- Responsive "Add Ingredient" button (icon-only on mobile)
- Mobile-optimized layout stays on one line
- Hover effects and smooth transitions

### IngredientItem

- Two-column grid display for efficient space usage
- Inline editing with blur/Enter to save
- Hover-revealed edit and delete icons (subtle secondary style)
- Truncation for long ingredient names (hover to see full name)
- Smooth animations on hover

### IngredientList

- Two-column responsive grid layout
- Scrollable with custom styled scrollbar
- Beautiful empty state with pulsing shopping icon
- Optimized for touch interactions

### CurrentRecipeDisplay

- Shows active recipe name or "Example Recipe" default
- Inline editing for recipe names
- Hover-revealed edit and delete icons
- Integrates with delete confirmation modal

### SaveRecipeModal

- Beautiful modal dialog with recipe name input
- Two-column preview of ingredients to be saved
- Save and Cancel actions
- Keyboard support (Enter to save, Escape to cancel)

### DeleteConfirmModal

- Confirmation dialog for recipe deletion
- Shows recipe name being deleted
- Warning that action cannot be undone
- Cancel or Delete options

## Backend API

The backend provides a RESTful API for managing ingredients and recipes with SQLite persistence.

### Endpoints

**Ingredients:**

- `GET /api/ingredients` - Fetch all ingredients
- `POST /api/ingredients` - Create a new ingredient
- `PUT /api/ingredients/:id` - Update an ingredient name
- `DELETE /api/ingredients/:id` - Delete an ingredient

**Recipes:**

- `GET /api/recipes` - Fetch all recipes with ingredients
- `POST /api/recipes` - Create a new recipe with ingredients
- `PUT /api/recipes/:id` - Update a recipe name
- `DELETE /api/recipes/:id` - Delete a recipe (cascade deletes)

**Health:**

- `GET /api/health` - Health check endpoint

### Database Schema

The database consists of three tables:

1. **ingredients** - Current shopping list items
2. **recipes** - Saved recipe collections
3. **recipe_ingredients** - Junction table linking recipes to ingredients

## Available Scripts

```bash
# Development
npm run dev              # Start both frontend and backend servers
npm run dev:server       # Start backend API only (port 3001)
npm run dev:client       # Start frontend dev server only (port 5173)

# Building
npm run build            # Build for production (with type checking)
npm run preview          # Preview production build locally
npm run typecheck        # Run TypeScript type checking

# Code Quality
npm run format           # Format all files with Prettier
npm run format:check     # Check if files are formatted
npm run lint             # Lint all files with ESLint
npm run lint:fix         # Lint and auto-fix issues

# Changelog
npm run changelog        # Update changelog from commits
npm run changelog:reset  # Regenerate entire changelog

# Production
npm start                # Start production server
```

## Design System

### Color Palette

- **Primary**: Green (400-800) - Main actions and branding
- **Secondary**: Emerald (400-600) - Complementary accents
- **Success**: Green/Emerald - Saved states
- **Warning**: Amber - Duplicate alerts
- **Info**: Blue - Informational messages
- **Danger**: Red - Delete actions
- **Neutral**: Gray (100-900) - Text and backgrounds

### Animation Principles

- **Duration**: 200-300ms for most transitions
- **Easing**: ease-out for natural motion
- **Hover**: Scale (1.02-1.05) for interactive elements
- **Active**: Scale (0.95-0.98) for pressed states
- **Dropdown**: Slide animations for menus

### Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (sm-lg)
- **Desktop**: > 1024px (lg+)

## Key Features Explained

### Duplicate Prevention

The app intelligently prevents saving duplicate recipes by:

- Comparing ingredient lists (case-insensitive, sorted)
- Blocking save action for default starter ingredients
- Showing helpful messages when duplicates are detected

### Smart Recipe Management

- Loads recipe ingredients into current list
- Tracks which recipe is currently active
- Allows editing recipe names inline
- Confirms before deleting entire recipes

### Mobile Optimization

- Icon-only buttons on small screens
- Responsive text sizing
- No text wrapping on any screen size
- Touch-optimized interactions

## Deployment

This app is ready to deploy to platforms like Render.com with full database persistence.

Quick deploy:

1. Push code to GitHub
2. Connect repository to your hosting platform
3. Deploy using the included `render.yaml` configuration

The app will be live at: `https://your-app-name.onrender.com`

### Preview Production Build

```bash
npm run preview
```

## Commit Message Format

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automatic changelog generation.

### Format

```
<type>(<scope>): <subject>
```

### Common Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Test changes
- `chore` - Build/tooling changes

### Examples

```bash
# Feature
git commit -m "feat(recipes): add duplicate detection"

# Bug fix
git commit -m "fix(api): resolve ingredient update issue"

# Documentation
git commit -m "docs(readme): update for recipe app refactoring"

# Refactoring
git commit -m "refactor(app): migrate from todo to recipe schema"
```

## Changelog

For a detailed history of changes, updates, and releases, see the [CHANGELOG.md](CHANGELOG.md).

## License

MIT
