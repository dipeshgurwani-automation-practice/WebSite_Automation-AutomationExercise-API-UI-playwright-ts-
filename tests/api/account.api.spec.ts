
import { test, expect } from '../../src/fixtures';
import { uniqueEmail } from '../../src/utils/userData';
import { apiCreateUser, apiDeleteUser, apiGetUserByEmail, apiUpdateUser } from '../../src/utils/userApi';

test.describe('Account API - create/read/update/delete (API_008 - API_009)', () => {
  test('API_008 create account then read it by email', async ({ request, cleanupEmail }) => {
    const email = uniqueEmail();
    cleanupEmail(email); // deleted automatically, even if an assertion fails
    const created = await apiCreateUser(request, email);
    expect(created.responseCode).toBe(201);
    expect(created.message).toBe('User created!');

    const body = await apiGetUserByEmail(request, email);
    expect(body.responseCode).toBe(200);
    expect(body.user.email).toBe(email);
    expect(body.user.first_name).toBe('Test');
  });

  test('API_009 update then delete account', async ({ request, registeredUser: email }) => {
    const updBody = await apiUpdateUser(request, email, { city: 'Mumbai' });
    expect(updBody.responseCode).toBe(200);
    expect(updBody.message).toBe('User updated!');

    const read = await apiGetUserByEmail(request, email);
    expect(read.user.city).toBe('Mumbai');

    const delBody = await apiDeleteUser(request, email);
    expect(delBody.responseCode).toBe(200);
    expect(delBody.message).toBe('Account deleted!');

    const gone = await apiGetUserByEmail(request, email);
    expect(gone.responseCode).toBe(404);
  });
});
