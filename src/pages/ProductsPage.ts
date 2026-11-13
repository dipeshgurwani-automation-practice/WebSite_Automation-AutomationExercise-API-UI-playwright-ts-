import { Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly title: Locator;
  readonly cards: Locator;
  readonly cartModal: Locator;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('.features_items .title');
    this.cards = page.locator('.features_items .product-image-wrapper');
    this.cartModal = page.locator('#cartModal');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
  }

  async open(): Promise<void> {
    await this.page.goto('/products');
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async getCardName(card: Locator): Promise<string> {
    return (await card.locator('.productinfo p').innerText()).trim();
  }

  async getCardPrice(card: Locator): Promise<string> {
    return (await card.locator('.productinfo h2').innerText()).trim();
  }

  async viewProduct(card: Locator): Promise<void> {
    await card.getByRole('link', { name: 'View Product' }).click();
  }

  async addToCart(card: Locator): Promise<void> {
    await card.hover();
    await card.locator('.product-overlay a.add-to-cart').click();
  }

  async goToCartFromModal(): Promise<void> {
    await this.cartModal.getByRole('link', { name: 'View Cart' }).click();
  }
}
