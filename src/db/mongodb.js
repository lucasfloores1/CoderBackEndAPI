import mongoose from 'mongoose';
import { logger } from '../config/logger.js';

export const init = async () => {
  try {
    const URI = process.env.MONGODB_URI;
    await mongoose.connect(URI);
    logger.info('Database connected');
  } catch (error) {
    logger.error(`Error to connect to database`);
  }
};
