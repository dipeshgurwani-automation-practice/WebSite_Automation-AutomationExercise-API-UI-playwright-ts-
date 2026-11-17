import type { APIRequestContext } from '@playwright/test';
import { env } from '../../config/env';

/** Fields left undefined are omitted from the request (for negative tests). */
export async function apiVerifyLogin(
  request: APIRequestContext,
  credentials: { email?: string; password?: string },
) {
  const form: Record<string, string> = {};
  if (credentials.email !== undefined) form.email = credentials.email;
  if (credentials.password !== undefined) form.password = credentials.password;

  const res = await request.post(`${env.apiUrl}/verifyLogin`, { form });
  return res.json();
}
