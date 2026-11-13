import { env } from '../../config/env';
import { User } from '../types/user';

export function uniqueEmail(): string {
  return `qa_${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;
}

export function buildUser(overrides: Partial<User> = {}): User {
  return {
    name: 'Test User',
    email: uniqueEmail(),
    password: env.defaultPassword,
    title: 'Mr',
    birth_date: '10',
    birth_month: '5',
    birth_year: '1990',
    firstname: 'Test',
    lastname: 'User',
    company: 'QA Corp',
    address1: '12 Main Street',
    address2: 'Flat 4',
    country: 'India',
    zipcode: '411001',
    state: 'Maharashtra',
    city: 'Pune',
    mobile_number: '9876543210',
    ...overrides,
  };
}
