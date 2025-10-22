import cors from 'cors'

const NODE_ENV = process.env.NODE_ENV || 'development';

const corsConfig = cors({
  origin: NODE_ENV === 'production' ? process.env.CLIENT_URL : '*',
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
});

export default corsConfig;