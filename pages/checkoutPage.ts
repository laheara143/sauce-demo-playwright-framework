import { Page, expect } from '@playwright/test';

export class CheckoutPage {
    constructor(private page: Page) {}

    async goToCheckout() {
        await this.page.locator('[data-test="checkout"]').click();
    }  

    async fillCheckoutInfo(fName: string, lName: string, postalCode: string) {
        await this.page.locator('[data-test="firstName"]').fill(fName);
        await this.page.locator('[data-test="lastName"]').fill(lName);
        await this.page.locator('[data-test="postalCode"]').fill(postalCode);
        await this.page.locator('[data-test="continue"]').click();
    }
    
    async finishCheckout() {
        await this.page.locator('[data-test="finish"]').click();

    }     
}