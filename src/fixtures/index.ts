import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { User } from '../types/user';
import { apiCreateUser, apiDeleteUser } from '../utils/userApi';
import { buildUser, uniqueEmail } from '../utils/userData';
import { CartPage } from '../pages/CartPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ContactPage } from '../pages/ContactPage';



type Fixtures = {
  loginPage: LoginPage;
  newUser: User;
  productsPage: ProductsPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  contactPage: ContactPage;
  /** Email of a user that already exists. Deleted after the test, pass or fail. */
  registeredUser: string;
  /** Call with an email the test creates itself; it is deleted after the test, pass or fail. */
  cleanupEmail: (email: string) => void;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  newUser: async ({ request }, use) => {
    const user = buildUser();
    await apiCreateUser(request, user.email);
    await use(user);
    await apiDeleteUser(request, user.email);
  },
    productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
    contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },

  registeredUser: async ({ request }, use) => {
    const email = uniqueEmail();

    const created = await apiCreateUser(request, email);
    expect(created.responseCode, 'precondition: user creation').toBe(201);

    await use(email); // the test runs here

    await apiDeleteUser(request, email); // teardown: always runs
  },

  cleanupEmail: async ({ request }, use) => {
    const emails: string[] = [];
    await use((email) => emails.push(email));
    for (const email of emails) await apiDeleteUser(request, email);
  },
});

export { expect };
