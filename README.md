Key Features:

1. Modern minimalist UI with clean design and subtle animations
2. Dark/light mode toggle that remembers your preference
3. Task management - add, edit, delete, and mark tasks as complete
4. Categories - organize tasks by work, personal, and shopping categories
5. Filtering - view all, active, or completed tasks
6. Search functionality - find tasks by keyword
7. Task statistics - see counts of total, complete, and remaining tasks
8. Responsive design - works on mobile and desktop devices

Advanced Features:

1. Drag and drop reordering - reposition tasks with intuitive drag-and-drop
2. Import/export tasks - save and load your tasks as JSON files
3. Bulk actions - perform operations on multiple tasks at once
4. Sample tasks - automatically added for first-time users
5. Keyboard shortcuts - improve usability for power users
6. Persistent storage - tasks save to localStorage

Technical Highlights:

1. Pure vanilla JavaScript - no dependencies required
2. LocalStorage for data persistence
3. Clean, modular code structure
4. SVG icons for crisp visuals at any resolution
5. CSS variables for easy theming

To run the application, you need to have node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

1. Install http-server globally:
  npm install -g http-server
2. Navigate to the project directory:
  cd path/to/your/project
3. Start the server:
  http-server -c-1
  The -c-1 flag disables caching, which is helpful during development.
4. Open in browser: Visit http://localhost:8080 (or whatever port is shown in the terminal)