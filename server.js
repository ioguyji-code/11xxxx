/**
 * Production Express server for Render / Cloud hosting
 */
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

// Security & hardware permission headers for Camera & GPS
app.use((req, res, next) => {
  res.setHeader(
    'Permissions-Policy',
    'camera=(self), microphone=(self), geolocation=(self), accelerometer=(self), gyroscope=(self)'
  );
  next();
});

// Serve compiled static files
app.use(express.static(path.join(__dirname, 'dist')));

// SPA Fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Dashcam app running on port ${PORT}`);
});
