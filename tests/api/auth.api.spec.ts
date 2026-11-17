/** BEGINNER VERSION - Auth API - verifyLogin (API_006 - API_008). */
import { test, expect } from '../../src/fixtures';
import { env } from '../../config/env';
import { uniqueEmail } from '../../src/utils/userData';
import { apiVerifyLogin } from '../../src/utils/authApi';

const PASSWORD = env.defaultPassword;

test.describe('Auth API - verifyLogin (API_005 - API_007)', () => {
  test('API_005 verifyLogin with valid user', async ({ request, registeredUser }) => {
    const body = await apiVerifyLogin(request, { email: registeredUser, password: PASSWORD });
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User exists!');
  });

  test('API_006 verifyLogin with unknown user returns 404', async ({ request }) => {
    const body = await apiVerifyLogin(request, {
      email: uniqueEmail(),
      password: 'NotARealPassword1',
    });
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!');
  });

  test('API_007 verifyLogin without email returns 400', async ({ request }) => {
    const body = await apiVerifyLogin(request, { password: 'SomePassword1' });
    expect(body.responseCode).toBe(400);
    expect(body.message).toBe(
      'Bad request, email or password parameter is missing in POST request.',
    );
  });
});
