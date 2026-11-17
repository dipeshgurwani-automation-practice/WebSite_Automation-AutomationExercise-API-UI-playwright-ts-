import type { APIRequestContext } from '@playwright/test';
import { env } from '../../config/env';
import { userForm } from './userData';

export async function apiCreateUser(request: APIRequestContext, email: string) {
  const res = await request.post(`${env.apiUrl}/createAccount`, { form: userForm(email) });
  return res.json();
}

export async function apiGetUserByEmail(request: APIRequestContext, email: string) {
  const res = await request.get(`${env.apiUrl}/getUserDetailByEmail`, { params: { email } });
  return res.json();
}

export async function apiUpdateUser(
  request: APIRequestContext,
  email: string,
  changes: Record<string, string> = {},
) {
  const form = { ...userForm(email), ...changes };
  const res = await request.put(`${env.apiUrl}/updateAccount`, { form });
  return res.json();
}

export async function apiDeleteUser(request: APIRequestContext, email: string) {
  const form = { email, password: env.defaultPassword };
  const res = await request.delete(`${env.apiUrl}/deleteAccount`, { form });
  return res.json();
}
