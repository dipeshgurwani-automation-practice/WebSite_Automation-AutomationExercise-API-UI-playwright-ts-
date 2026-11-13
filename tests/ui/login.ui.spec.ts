import { test, expect } from '../../src/fixtures';
import users from '../../test-data/users.json';

test.describe('Authentication (UI)', () => {
  test('UI_002 login with valid credentials', { tag: ['@smoke', '@regression'] }, async ({ loginPage, newUser }) => {
    await loginPage.open();
    await expect(loginPage.loginHeading).toBeVisible();
    await loginPage.login(newUser.email, newUser.password);

    await expect(loginPage.shopMenu).toContainText(`Logged in as ${newUser.name}`);
    await expect(loginPage.logoutLink).toBeVisible();
  });

  for (const { description, email, password } of users.invalidLogins) {
    test(`UI_003 login fails with ${description}`, { tag: ['@regression', '@negative'] }, async ({ loginPage }) => {
      await loginPage.open();
      await loginPage.login(email, password);

      await expect(loginPage.loginError).toHaveText('Your email or password is incorrect!');
      await expect(loginPage.logoutLink).toBeHidden();
    });
  }

  test('UI_004 logout returns to login page', { tag: ['@regression'] }, async ({ page, loginPage, newUser }) => {
    await loginPage.open();
    await loginPage.login(newUser.email, newUser.password);
    await expect(loginPage.logoutLink).toBeVisible();

    await loginPage.logoutLink.click();

    await expect(loginPage.loginHeading).toBeVisible();
    await expect(loginPage.logoutLink).toBeHidden();
    await expect(page).toHaveURL(/\/login/);
  });

  test('UI_005 registering with existing email shows error', { tag: ['@regression', '@negative'] }, async ({ loginPage, newUser }) => {
    await loginPage.open();
    await loginPage.startSignup('Duplicate User', newUser.email);

    await expect(loginPage.signupError).toHaveText('Email Address already exist!');
  });
});
