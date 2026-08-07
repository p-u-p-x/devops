require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Allow cross-origin requests from S3-hosted frontend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

// GET /api/message — main demo route
app.get('/api/message', (req, res) => {
  res.json({
    message: 'Hello from EC2 backend!',
    timestamp: new Date().toISOString(),
  });
});

// GET /api/health — used to confirm deployment is working
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
