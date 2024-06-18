const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Use the CORS middleware
app.use(cors());

app.use(express.json());

// Middleware to serve static files
app.use(express.static('public'));

app.get('/recipe', (req, res) => {
  res.send({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
