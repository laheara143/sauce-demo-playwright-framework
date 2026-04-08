import {test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Standard User can remove added items and the cart badge will reflect that', () => {

test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
});

test('Navigate to page, Log In, Add Items, Remove Items and verify Cart Badge', async ({page}) => {

    //Wait for page to fully load
    await page.waitForLoadState();

    //Add items to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    //Verify cart badge is updated
    await expect (page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    //Go to cart
    await page.click('#shopping_cart_container');

    //Remove all items
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    await page.click('[data-test="remove-sauce-labs-bike-light"]');

    //Verify cart badge is updated
    await expect(page.getByTestId('[data-test="shopping-cart-badge"]')).toBeHidden();

    //Screenshot to verify Test Results
    await page.screenshot({ path: 'screenshots/removed-items.png' });


});

});
