/** BEGINNER VERSION - Catalog API tests (API_001 - API_004): products, brands, search. */
import { test, expect } from '@playwright/test';
import { apiGetBrands, apiGetProducts, apiSearchProduct } from '../../src/utils/catalogApi';

test.describe('Catalog API', () => {
  test('API_001 GET /productsList returns products', async ({ request }) => {
    const body = await apiGetProducts(request);
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
    expect(body.products[0].name).toBeTruthy();
    expect(body.products[0].price).toMatch(/^Rs\. \d+/);
  });
  test('API_002 GET /brandsList returns brands', async ({ request }) => {
    const body = await apiGetBrands(request);
    expect(body.responseCode).toBe(200);
    expect(body.brands.length).toBeGreaterThan(0);
  });
  for (const term of ['top', 'tshirt', 'jeans']) {
    test(`API_003 POST /searchProduct finds "${term}"`, async ({ request }) => {
      const body = await apiSearchProduct(request, term);
      expect(body.responseCode).toBe(200);
      expect(body.products.length).toBeGreaterThanOrEqual(1);
    });
  }

  test('API_004 POST /searchProduct without parameter returns 400', async ({ request }) => {
    const body = await apiSearchProduct(request);
    expect(body.responseCode).toBe(400);
    expect(body.message).toBe('Bad request, search_product parameter is missing in POST request.');
  });
});
