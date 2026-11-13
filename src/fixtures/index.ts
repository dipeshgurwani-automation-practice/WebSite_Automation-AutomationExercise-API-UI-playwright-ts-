import { test as base, expect } from '@playwright/test';
import { AccountApi } from '../api/AccountApi';
import { LoginPage } from '../pages/LoginPage';
import { User } from '../types/user';
import { buildUser } from '../utils/userFactory';
import { CartPage } from '../pages/CartPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ContactPage } from '../pages/ContactPage';
import { AuthApi } from '../api/AuthApi';
import { CatalogApi } from '../api/CatalogApi';



type Fixtures = {
  loginPage: LoginPage;
  accountApi: AccountApi;
  newUser: User;
  productsPage: ProductsPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  contactPage: ContactPage;
  authApi: AuthApi;
  catalogApi: CatalogApi;
  trackUser: (user: User) => void;


};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  accountApi: async ({ request }, use) => {
    await use(new AccountApi(request));
  },

  newUser: async ({ accountApi }, use) => {
    const user = buildUser();
    await accountApi.create(user);
    await use(user);
    await accountApi.delete(user);
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
    authApi: async ({ request }, use) => {
    await use(new AuthApi(request));
  },

  catalogApi: async ({ request }, use) => {
    await use(new CatalogApi(request));
  },

  trackUser: async ({ accountApi }, use) => {
    const created: User[] = [];
    await use((user) => {
      created.push(user);
    });
    for (const user of created) {
      await accountApi.delete(user);
    }
  },



});

export { expect };
