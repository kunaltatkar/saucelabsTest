const { test, expect } = require('@playwright/test')

test('Sign in to Swag labs page @sauce', async ({ browser }) => {

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://www.saucedemo.com/')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs')



    // Verify accepted usernames are mentioned on the page
    await expect(page.locator('.login_credentials')).toBeVisible()
    await expect(page.locator('.login_credentials h4')).toHaveText('Accepted usernames are:')
    await expect(page.locator('.login_password h4')).toHaveText('Password for all users:')

    // Entering the username but no password to check for validations
    await page.locator('#user-name').fill('standard_user')
    await page.locator('#login-button').click()
    await expect(page.locator('.error-button')).toBeVisible()
    const error = await page.locator('h3').textContent()
    expect(error).toContain('Epic sadface: Password is required')

    // Entering the username and incorrect password to check for validations
    await page.locator('#user-name').fill('standard_user')
    await page.locator('#password').fill('abcd')
    await page.locator('#login-button').click()
    await expect(page.locator('.error-button')).toBeVisible()
    const error2 = await page.locator('h3').textContent()
    expect(error2).toContain('Epic sadface: Username and password do not match any user in this service')

    // Entering the correct username and  password 
    await page.locator('#user-name').fill('standard_user')
    await page.locator('#password').fill('secret_sauce')
    await page.locator('#login-button').click()
    const url = await page.url()
    expect(url).toContain('inventory')

    // verifying the contents on the inventory page 
    await expect(page.locator('.header_label .app_logo')).toBeVisible()
    const headerlabel = await page.locator('.header_label .app_logo').textContent()
    expect(headerlabel).toContain('Swag Labs')

    // Iterating the products and adding Onesie to the cart 
    const product = await page.locator('.inventory_item')
    const productCount = await page.locator('.inventory_item').count()


    for (let i= 0; i < productCount; i++){
        if (await product.nth(i).locator('.inventory_item_name ').textContent() === 'Sauce Labs Onesie'){
            product.nth(i).locator('[id*="add-to-cart"]').click()
        }

    }

    // Click on the cart icon 
    await page.waitForTimeout(2000)
    await page.locator('#shopping_cart_container').click()
    const urlCart = page.url()
    expect(urlCart).toContain('cart')

    await page.waitForLoadState('domcontentloaded')

    await expect(page.locator('.title')).toContainText('Your Cart')
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Onesie')

    // Navigating to the checkout page 
    await page.locator('button:has-text("Checkout")').click()
    await page.locator('#first-name').fill('Test')
    await page.locator('#last-name').fill('User')
    await page.locator('#postal-code').fill('3024')
    await page.locator('#continue').click()


    // Price page 
    await expect(page.locator('[data-test$="total-info-label"]')).toHaveText('Price Total')
    await expect(page.locator('button:has-text("Finish")')).toBeVisible()











})