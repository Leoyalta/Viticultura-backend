//wupbyk-2cycBi-wotbyf

import { mongoose } from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoDB = async () => {
  const user = env('MONGODB_USER');
  const pass = env('MONGODB_PASSWORD');
  const url = env('MONGODB_URL');
  const name = env('MONGODB_NAME');
  const DB_HOST = `mongodb+srv://${user}:${pass}@${url}/${name}?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    await mongoose.connect(DB_HOST);
    console.log('MongoDB is successfuly connected');
  } catch (error) {
    'MongoDB connectin is failed', error.message;
    throw error;
  }
};
