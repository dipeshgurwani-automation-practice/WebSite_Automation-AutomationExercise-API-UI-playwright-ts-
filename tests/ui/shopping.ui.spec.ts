import { test, expect } from '../../src/fixtures';

test.describe('Products and cart (UI)', () => {
  test('UI_005 products list and product detail', { tag: ['@smoke', '@regression'] }, async ({ productsPage, productDetailPage }) => {
    await productsPage.open();
    await expect(productsPage.title).toContainText(/all products/i);
    const firstCard = productsPage.cards.first();
    await expect(firstCard).toBeVisible();

    const firstName = await productsPage.getCardName(firstCard);
    await productsPage.viewProduct(firstCard);

    await expect(productDetailPage.name).toHaveText(firstName);
    await expect(productDetailPage.category).toBeVisible();
    await expect(productDetailPage.availability).toBeVisible();
    await expect(productDetailPage.condition).toBeVisible();
    await expect(productDetailPage.brand).toBeVisible();
  });

  for (const term of ['Dress', 'Tshirt', 'Jeans']) {
    test(`UI_006 search for "${term}"`, { tag: ['@regression'] }, async ({ productsPage }) => {
      await productsPage.open();
      await productsPage.search(term);

      await expect(productsPage.title).toContainText(/searched products/i);
      await expect(productsPage.cards.first()).toBeVisible();
    });
  }

  test('UI_007 add product to cart and verify', { tag: ['@smoke', '@regression'] }, async ({ productsPage, cartPage }) => {
    await productsPage.open();
    const card = productsPage.cards.first();
    const name = await productsPage.getCardName(card);
    const price = await productsPage.getCardPrice(card);

    await productsPage.addToCart(card);
    await expect(productsPage.cartModal).toBeVisible();
    await productsPage.goToCartFromModal();

    await expect(cartPage.rows).toHaveCount(1);
    const row = cartPage.rowFor(name);
    await expect(row).toBeVisible();
    await expect(cartPage.priceIn(row)).toContainText(price);
    await expect(cartPage.quantityIn(row)).toHaveText('1');
  });

  test('UI_008 remove product from cart', { tag: ['@regression'] }, async ({ productsPage, cartPage }) => {
    await productsPage.open();
    const card = productsPage.cards.first();
    const name = await productsPage.getCardName(card);

    await productsPage.addToCart(card);
    await productsPage.goToCartFromModal();

    await expect(cartPage.rowFor(name)).toBeVisible();
    await cartPage.removeItem(name);

    await expect(cartPage.emptyMessage).toContainText(/cart is empty/i);
  });
});
