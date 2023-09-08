import { MongoClient } from 'mongodb';
require('dotenv').config();
export const getDb = async () => {
  const client = await MongoClient.connect(process.env.DATABASE_URL!);
  return client.db();
};