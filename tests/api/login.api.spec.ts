import { test, expect } from '../../src/fixtures';
import { uniqueEmail } from '../../src/utils/userFactory';

test.describe('Auth API - verifyLogin', () => {
  test('API_006 verifyLogin with valid user', { tag: ['@smoke', '@regression'] }, async ({ authApi, newUser }) => {
    const body = await authApi.verifyLogin({ email: newUser.email, password: newUser.password });
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User exists!');
  });

  test('API_007 verifyLogin with unknown user returns 404', { tag: ['@regression', '@negative'] }, async ({ authApi }) => {
    const body = await authApi.verifyLogin({ email: uniqueEmail(), password: 'NotARealPassword1' });
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!');
  });

  test('API_008 verifyLogin without email returns 400', { tag: ['@regression', '@negative'] }, async ({ authApi }) => {
    const body = await authApi.verifyLogin({ password: 'SomePassword1' });
    expect(body.responseCode).toBe(400);
    expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.');
  });
});
