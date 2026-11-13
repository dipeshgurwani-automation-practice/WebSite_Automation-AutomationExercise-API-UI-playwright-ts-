import { test, expect } from '../../src/fixtures';

test.describe('Catalog API', () => {
  test('API_001 GET /productsList returns products', { tag: ['@smoke', '@regression'] }, async ({ catalogApi }) => {
    const body = await catalogApi.getProducts();
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
    expect(body.products[0].name).toBeTruthy();
    expect(body.products[0].price).toMatch(/^Rs\. \d+/);
  });

  test('API_002 GET /brandsList returns brands', { tag: ['@regression'] }, async ({ catalogApi }) => {
    const body = await catalogApi.getBrands();
    expect(body.responseCode).toBe(200);
    expect(body.brands.length).toBeGreaterThan(0);
  });

  for (const term of ['top', 'tshirt', 'jeans']) {
    test(`API_003 POST /searchProduct finds "${term}"`, { tag: ['@regression'] }, async ({ catalogApi }) => {
      const body = await catalogApi.searchProduct(term);
      expect(body.responseCode).toBe(200);
      expect(body.products.length).toBeGreaterThanOrEqual(1);
    });
  }

  test('API_004 POST /searchProduct without parameter returns 400', { tag: ['@regression', '@negative'] }, async ({ catalogApi }) => {
    const body = await catalogApi.searchProduct();
    expect(body.responseCode).toBe(400);
    expect(body.message).toBe('Bad request, search_product parameter is missing in POST request.');
  });

  const unsupported = [
    { method: 'POST', endpoint: '/productsList' },
    { method: 'PUT', endpoint: '/brandsList' },
    { method: 'DELETE', endpoint: '/verifyLogin' },
  ];
  for (const { method, endpoint } of unsupported) {
    test(`API_005 ${method} ${endpoint} returns 405`, { tag: ['@regression', '@negative'] }, async ({ catalogApi }) => {
      const body = await catalogApi.callWithMethod(method, endpoint);
      expect(body.responseCode).toBe(405);
      expect(body.message).toBe('This request method is not supported.');
    });
  }
});
