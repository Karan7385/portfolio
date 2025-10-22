import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

import express from 'express';
import helmet from 'helmet';
import corsConfig from './middlewares/corsConfig.js';
import contactRoutes from './routes/contact.route.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

// --- Middleware ---
app.use(helmet());
app.use(corsConfig);
app.use(express.json());

// --- Routes ---
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    environment: process.env.NODE_ENV,
    service: 'Contact API',
  });
});

app.use('/api/contact', contactRoutes);

// --- Error Handling ---
app.use(errorHandler);

export default app;