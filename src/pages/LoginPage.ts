import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly shopMenu: Locator;
  readonly signupLoginLink: Locator;
  readonly logoutLink: Locator;

  readonly loginHeading: Locator;
  readonly loginEmail: Locator;
  readonly loginPassword: Locator;
  readonly loginButton: Locator;
  readonly loginError: Locator;

  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly signupButton: Locator;
  readonly signupError: Locator;

  constructor(private readonly page: Page) {
    this.shopMenu = page.locator('.shop-menu');
    this.signupLoginLink = page.locator('.shop-menu a[href="/login"]');
    this.logoutLink = page.locator('.shop-menu a[href="/logout"]');

    this.loginHeading = page.getByRole('heading', { name: 'Login to your account' });
    this.loginEmail = page.locator('[data-qa="login-email"]');
    this.loginPassword = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.loginError = page.locator('.login-form p');

    this.signupName = page.locator('[data-qa="signup-name"]');
    this.signupEmail = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.signupError = page.locator('.signup-form p');
  }

  async open(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async startSignup(name: string, email: string): Promise<void> {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupButton.click();
  }
}
