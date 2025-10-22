import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

import app from './app.js';

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

const startServer = async () => {
  try {

    app.listen(PORT, () => {
      console.log('\n-------------------------------------------------');
      console.log(`🚀 Contact API running in ${NODE_ENV} mode`);
      console.log(`🔗 Listening on: http://localhost:${PORT}`);
      console.log('-------------------------------------------------\n');
    });
  } catch (error) {
    console.error('CRITICAL: Failed to start server or verify services.', error);
    process.exit(1);
  }
};

startServer();