import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  baseUrl: required('BASE_URL'),
  apiUrl: required('API_URL'),
  defaultPassword: required('DEFAULT_PASSWORD'),
};
