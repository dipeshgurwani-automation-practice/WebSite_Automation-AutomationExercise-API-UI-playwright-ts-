import type { APIRequestContext } from '@playwright/test';
import { env } from '../../config/env';

export async function apiGetProducts(request: APIRequestContext) {
  const res = await request.get(`${env.apiUrl}/productsList`);
  return res.json();
}

export async function apiGetBrands(request: APIRequestContext) {
  const res = await request.get(`${env.apiUrl}/brandsList`);
  return res.json();
}

/** Pass no term to send the request without the required parameter (negative test). */
export async function apiSearchProduct(request: APIRequestContext, term?: string) {
  const form = term === undefined ? undefined : { search_product: term };
  const res = await request.post(`${env.apiUrl}/searchProduct`, { form });
  return res.json();
}
