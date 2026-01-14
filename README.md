# Task Manager

A modern, feature-rich task management application built with **TypeScript**, HTML, and CSS. This project is designed with future scalability in mind, making it easy to migrate to React, Sass, and other modern frameworks.

## Features

- ✅ Add, delete, and complete tasks
- 🔍 Filter tasks by status (All, Active, Completed)
- 💾 Persistent storage using localStorage
- 📊 Task statistics and counters
- 🎨 Bento-style UI design - clean and modern
- 📱 Responsive design for all devices
- ⚡ No page reload required for operations
- 🎯 BEM methodology for maintainable CSS

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styles with CSS variables and BEM methodology
- **TypeScript** - Type-safe JavaScript with interfaces
- **Bootstrap Icons** - Icon library
- **localStorage** - Client-side data persistence

## Project Structure

```
.
├── index.html          # Main HTML file
├── ts/                 # TypeScript source files
│   ├── app.ts          # Main application entry point
│   ├── taskManager.ts  # Task management logic
│   ├── storage.ts      # localStorage operations
│   └── types.ts        # TypeScript interfaces and types
├── js/                 # Compiled JavaScript (generated)
│   ├── app.js
│   ├── taskManager.js
│   ├── storage.js
│   └── types.js
├── styles/
│   └── main.css        # Custom CSS styles
├── tsconfig.json       # TypeScript configuration
├── package.json        # Node.js dependencies
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher) and **npm**
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Compile TypeScript to JavaScript:
   ```bash
   npx tsc
   ```
   Or use the npm script:
   ```bash
   npm run build
   ```
3. Build TypeScript files:
   ```bash
   npx tsc
   ```
   Or use the npm script:
   ```bash
   npm run build
   ```
4. Open `index.html` in your web browser or use a local server
5. Start managing your tasks!

### Development

For development with automatic recompilation:

```bash
# Watch mode - automatically recompiles on file changes
npx tsc --watch
# Or use npm script
npm run watch
```

### Using a Local Server (Recommended)

For better development experience, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## Usage

### Adding Tasks

1. Type your task in the input field
2. Click the "Add" button or press Enter
3. Your task will appear in the list

### Managing Tasks

- **Complete a task**: Click the checkbox next to the task
- **Delete a task**: Click the trash icon that appears on hover
- **Filter tasks**: Use the filter buttons (All, Active, Completed)
- **Clear completed**: Click "Clear Completed" to remove all finished tasks

## Architecture

The application is built with a modular TypeScript architecture:

### TypeScript Interfaces

- **`TaskItem`** - Interface defining the structure of a task:
  ```typescript
  interface TaskItem {
      id: number;
      text: string;
      completed: boolean;
      createdAt: string;
  }
  ```

- **`FilterType`** - Union type for task filtering ('all' | 'active' | 'completed')
- **`TaskStatistics`** - Interface for task statistics

### TaskManager Class
- Handles all task-related operations with full type safety
- Manages task state and filtering
- Provides statistics and data access
- Uses `TaskItem[]` for type-safe task arrays

### Storage Module
- Handles localStorage persistence with type safety
- Provides save/load/clear operations
- Error handling for storage operations
- Type-safe serialization/deserialization

### App Class
- Coordinates UI interactions with typed DOM elements
- Renders task list and updates display
- Manages event listeners with proper TypeScript types
- Full type safety throughout the application

## Design System

The project uses a **Bento-style design** with a clean, card-based layout:

- **BEM Methodology**: All CSS classes follow Block-Element-Modifier naming convention
- **CSS Variables**: Centralized design tokens for colors, spacing, and transitions
- **Responsive Grid**: Adaptive layout that works on all screen sizes
- **Minimalist Aesthetic**: Clean, uncluttered interface for easy navigation

## Future Migration Path

This project is designed to support future enhancements:

### ✅ TypeScript Migration (Completed)
- ✅ Task objects use `TaskItem` interface
- ✅ All functions are fully typed
- ✅ Type-safe module structure
- ✅ Strict TypeScript configuration

### React Migration
- Component structure can be mapped to:
  - `TaskList` component
  - `TaskItem` component
  - `AddTaskForm` component
- State management ready for React hooks

### Sass Integration
- CSS variables already defined for easy Sass conversion
- Modular CSS structure supports Sass partials
- Ready for nesting and mixins

### PWA Support
- Service worker ready structure
- Offline capability can be added
- Manifest file can be integrated

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

