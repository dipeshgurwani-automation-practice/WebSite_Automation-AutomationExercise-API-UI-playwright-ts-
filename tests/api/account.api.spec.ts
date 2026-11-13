import { test, expect } from '../../src/fixtures';
import { buildUser } from '../../src/utils/userFactory';

test.describe('Account API - create/read/update/delete', () => {
  test('API_009 create account then read it by email', { tag: ['@smoke', '@regression'] }, async ({ accountApi, trackUser }) => {
    const user = buildUser();
    const created = await accountApi.create(user);
    trackUser(user);
    expect(created.responseCode).toBe(201);
    expect(created.message).toBe('User created!');

    const body = await accountApi.getByEmail(user.email);
    expect(body.responseCode).toBe(200);
    expect(body.user.email).toBe(user.email);
    expect(body.user.first_name).toBe(user.firstname);
  });

  test('API_010 update then delete account', { tag: ['@regression'] }, async ({ accountApi, trackUser }) => {
    const user = buildUser();
    await accountApi.create(user);
    trackUser(user);

    const updated = await accountApi.update({ ...user, city: 'Mumbai' });
    expect(updated.responseCode).toBe(200);
    expect(updated.message).toBe('User updated!');
    expect((await accountApi.getByEmail(user.email)).user.city).toBe('Mumbai');

    const deleted = await accountApi.delete(user);
    expect(deleted.responseCode).toBe(200);
    expect(deleted.message).toBe('Account deleted!');

    expect((await accountApi.getByEmail(user.email)).responseCode).toBe(404);
  });
});
