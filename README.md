# Task Manager

A modern, feature-rich task management application built with vanilla JavaScript, HTML, and CSS. This project is designed with future scalability in mind, making it easy to migrate to TypeScript, React, and other modern frameworks.

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
- **JavaScript (ES6+)** - Vanilla JS with modules
- **Bootstrap Icons** - Icon library
- **localStorage** - Client-side data persistence

## Project Structure

```
.
├── index.html          # Main HTML file
├── styles/
│   └── main.css       # Custom CSS styles
├── js/
│   ├── app.js         # Main application entry point
│   ├── taskManager.js # Task management logic
│   └── storage.js     # localStorage operations
└── README.md          # Project documentation
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start managing your tasks!

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

The application is built with a modular architecture:

### TaskManager Class
- Handles all task-related operations
- Manages task state and filtering
- Provides statistics and data access

### Storage Module
- Handles localStorage persistence
- Provides save/load/clear operations
- Error handling for storage operations

### App Class
- Coordinates UI interactions
- Renders task list and updates display
- Manages event listeners

## Design System

The project uses a **Bento-style design** with a clean, card-based layout:

- **BEM Methodology**: All CSS classes follow Block-Element-Modifier naming convention
- **CSS Variables**: Centralized design tokens for colors, spacing, and transitions
- **Responsive Grid**: Adaptive layout that works on all screen sizes
- **Minimalist Aesthetic**: Clean, uncluttered interface for easy navigation

## Future Migration Path

This project is designed to support future enhancements:

### TypeScript Migration
- Task objects can be easily converted to a `TaskItem` interface
- All functions are typed-ready
- Module structure supports TypeScript compilation

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

