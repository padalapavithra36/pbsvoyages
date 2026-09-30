import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from Vite dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint for Cloud Run
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'VoyageEase', timestamp: new Date().toISOString() });
});

// SPA fallback: any other request returns index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`VoyageEase server listening on http://0.0.0.0:${PORT}`);
});
