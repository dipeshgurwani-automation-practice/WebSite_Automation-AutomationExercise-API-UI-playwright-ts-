import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly rows: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    this.rows = page.locator('#cart_info_table tbody tr');
    this.emptyMessage = page.locator('#empty_cart');
  }

  rowFor(productName: string): Locator {
    return this.rows.filter({ hasText: productName });
  }

  priceIn(row: Locator): Locator {
    return row.locator('.cart_price');
  }

  quantityIn(row: Locator): Locator {
    return row.locator('.cart_quantity');
  }

  async removeItem(productName: string): Promise<void> {
    await this.rowFor(productName).locator('.cart_quantity_delete').click();
  }
}
