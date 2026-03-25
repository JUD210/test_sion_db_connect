require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { initDB } = require('./db/init');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize database
initDB();

// Serve static HTML files
app.use(express.static(path.join(__dirname, '..', 'public')));

// API routes
app.use('/api/interviews', require('./routes/interviews'));
app.use('/api/worklogs', require('./routes/worklogs'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/tesol', require('./routes/tesol'));

// React SPA fallback (/app/*)
app.get('/app/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'app', 'index.html'));
});

// Root → home.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
