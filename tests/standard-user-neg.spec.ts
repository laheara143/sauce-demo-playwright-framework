import {test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';


test.describe('Standard User can remove added items and the cart badge will reflect that', () => {

test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
});

test('Navigate to page, Log In, Add Items, Remove Items and verify Cart Badge', async ({page}) => {
   
    const inventoryPage = new InventoryPage(page);

    //Wait for page to fully load
    await page.waitForLoadState();

    //Add items to cart
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.addItemToCart('sauce-labs-bike-light');

    //Verify cart badge is updated
    await expect (page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    //Go to cart
    await inventoryPage.goToCart();

    //Remove all items
    await inventoryPage.removeItem('sauce-labs-backpack');
    await inventoryPage.removeItem('sauce-labs-bike-light');

    //Verify cart badge is updated
    await expect(page.getByTestId('[data-test="shopping-cart-badge"]')).toBeHidden();

    //Screenshot to verify Test Results
    await page.screenshot({ path: 'screenshots/removed-items.png' });


});

});
