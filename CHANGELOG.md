# Changelog

> **⚠️ IMPORTANT: This changelog is manually maintained.**  
> **Do NOT use automated changelog generation tools (conventional-changelog, etc.)**  
> **Update this file manually to keep it clean and readable.**

All notable changes to this project will be documented in this file.

## [Beta] - 2025-12-23

### 🎉 Complete Application Refactoring

**App transformed from Todo application to Recipe & Ingredients manager**

### Added

#### 🍳 Core Recipe Features
- ✨ Ingredient management system (add, edit, delete)
- 📝 Recipe saving with ingredient lists
- 💾 Recipe library with load functionality
- 🔄 Smart recipe detection (auto-loads last saved recipe)
- 🚫 Duplicate recipe prevention (frontend + backend)
- ⏰ Recipe timestamps with relative time display (5m ago, 2h ago, etc.)
- 🆕 "New" button to start fresh ingredient lists
- 💬 Unsaved changes warning with save/discard options

#### 🎨 UI/UX Enhancements
- 🌅 Light mode design with prominent background imagery
- 🖼️ 10 rotating kitchen/restaurant background images
- 🛒 Shopping basket logo with circular border
- 🟢 Green theme throughout (emerald/green color palette)
- 📱 Two-column ingredient grid layout for efficient space usage
- ✏️ Inline editing for ingredients (blur or Enter to save)
- 🖱️ Touch-friendly actions with click-to-toggle on mobile
- 📏 25 character limit on ingredient names
- 🔤 Auto-capitalization of first letter
- 🎯 Auto-focus on empty state
- 📊 Live statistics (ingredient count, recipe count)

#### 📱 Mobile Optimization
- 🔍 Fixed iOS form zoom (16px minimum font size)
- 👆 Tap-to-reveal edit/delete icons
- 🖱️ Click-away to hide actions
- ⌨️ Escape key closes all modals
- 📱 Icon-only Add button on mobile portrait
- 📏 Compact button layouts prevent text wrapping

#### 🎭 Visual Polish
- 🌟 Subtle white shadows on header for readability
- 🔘 Button-style borders on edit/delete icons
- 🎨 Dynamic Save button (green when changes, gray when clean)
- 💫 Smooth animations and transitions
- 🖼️ Fixed background (no scroll movement)
- 📜 Scrollable ingredient list (max 50vh height)
- 🎪 Beautiful modal dialogs for save/delete actions

#### 🔧 Technical Improvements
- 🗄️ Migrated database schema (todos → recipes/ingredients)
- 🔌 New API endpoints for ingredients and recipes
- 🛡️ Backend duplicate validation (409 Conflict response)
- 🧹 Database cleanup script (removes duplicates on dev start)
- 💾 Persistent disk support for Render deployment ($1/month)
- 📦 Updated app name to "fresh-finds-recipes"

### Changed

#### 🎨 Branding & Theme
- 📛 App renamed to "Fresh & Fast Finds"
- 🎨 Color theme: Blue → Green (emerald/green palette)
- 🌑 Dark mode → ☀️ Light mode
- 🎪 Logo: Todo checkbox → Shopping basket with vegetables
- 💬 Tagline: "Stay organized" → "Shop, prep and go cook!"

#### 🔄 Functionality Updates
- 📝 Save Recipe button: Only activates on adding ingredients (not edit/delete)
- 💾 Recipe updates: In-place updates (no duplicates)
- 📋 Modal: Pre-populates with current recipe name for updates
- 🎯 Empty state: Hides recipe display when no ingredients
- 📊 Stats moved to bottom (from top)
- 🔽 Saved Recipes dropdown: Opens downward (was upward)

### Removed

- ❌ Todo-related components (TodoInput, TodoItem, TodoList, TodoFilters)
- ❌ Todo API routes and database schema
- ❌ Default starter ingredients (clean slate on first load)
- ❌ Dark mode styling and animations
- ❌ Footer with tech stack branding
- ❌ Completed/Active todo filtering

### Fixed

- 🐛 iOS mobile form zoom on input focus
- 🐛 Duplicate recipes being created on save
- 🐛 Edit/delete icons not accessible on mobile
- 🐛 Background image scrolling with content
- 🐛 Text wrapping on mobile screens
- 🐛 Missing closing tags in Vue templates
- 🐛 TypeScript errors (unused imports)
- 🐛 Dropdown not closing on click-away
- 🐛 Save button showing warnings on initial load

### Technical Details

#### Database Schema
- **ingredients** - Current shopping list items
- **recipes** - Saved recipe collections  
- **recipe_ingredients** - Junction table linking recipes to ingredients

#### API Endpoints
- `GET/POST/PUT/DELETE /api/ingredients` - Ingredient CRUD
- `GET/POST/PUT/DELETE /api/recipes` - Recipe CRUD with ingredients

#### Stack
- **Frontend**: Vue 3, TypeScript, Tailwind CSS, Iconify
- **Backend**: Express.js, SQLite (better-sqlite3)
- **Deployment**: Render.com with persistent disk storage

---

## 🚀 Beta Testing Phase

This is a **beta release** for testing purposes. The application is fully functional but may receive updates based on user feedback.

**Live Demo:** [https://fresh-finds-recipes.onrender.com/](https://fresh-finds-recipes.onrender.com/)

**Repository:** [https://github.com/johntmunger/fresh-finds-recipes](https://github.com/johntmunger/fresh-finds-recipes)

---

## How to Update This Changelog

When making changes, add entries under the appropriate heading:

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

Format: `- Category: Description of change`
