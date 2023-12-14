const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Catch all other routes and serve 'index.html'
app.get('/*', (req, res) => {
  res.sendFile('guitarchive_frontend/index.html', { root: path.join(__dirname, 'dist') });
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
