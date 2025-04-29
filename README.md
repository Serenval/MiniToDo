To run the application, you need to have node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

1. Install http-server globally:
  npm install -g http-server
2. Navigate to the project directory:
  cd path/to/your/project
3. Start the server:
  http-server -c-1
  The -c-1 flag disables caching, which is helpful during development.
4. Open in browser: Visit http://localhost:8080 (or whatever port is shown in the terminal)