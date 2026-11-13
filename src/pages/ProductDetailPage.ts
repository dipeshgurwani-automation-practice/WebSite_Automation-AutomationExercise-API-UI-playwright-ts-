import { Locator, Page } from '@playwright/test';

export class ProductDetailPage {
  readonly info: Locator;
  readonly name: Locator;
  readonly category: Locator;
  readonly availability: Locator;
  readonly condition: Locator;
  readonly brand: Locator;

  constructor(page: Page) {
    this.info = page.locator('.product-information');
    this.name = this.info.locator('h2');
    this.category = this.info.getByText(/Category:/);
    this.availability = this.info.getByText(/Availability:/);
    this.condition = this.info.getByText(/Condition:/);
    this.brand = this.info.getByText(/Brand:/);
  }
}
