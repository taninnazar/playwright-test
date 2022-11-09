import { test, expect } from '@playwright/test';

test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto('https://qa.awarasleep.com/');
  await expect(page).toHaveTitle('Awara');
  await expect(page.url()).toContain('qa.awarasleep.com');

  await page.getByTestId('hero_shop_mattress').click();
  await expect(page.url()).toContain('qa.awarasleep.com/mattress');

  await page.getByTestId('addtocart_btn').click();
  await expect(page).toHaveTitle('Awara - Express Checkout');
  await expect(page.url()).toContain('qa.awarasleep.com/checkout/shipping');
  const addedToCartItem = await page.getByTestId('cart_items_area').getByTestId('awara-latex-hybrid-mattress');
  await expect(addedToCartItem).toBeVisible();
});
