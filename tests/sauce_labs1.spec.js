const { test, expect } = require('@playwright/test')
const { SauceloginPage } = require('../pageobjects/SauceloginPage')

test('Sign in to Swag labs page @sauce', async ({ browser }) => {

    const context = await browser.newContext()
    const page = await context.newPage()
    const sauceloginpage = new SauceloginPage(page)

    await page.goto('https://www.saucedemo.com/')
    await page.waitForLoadState('networkidle')
    await sauceloginpage.expectloginLogoText('Swag Labs')


    // Verify accepted usernames are mentioned on the page
    await sauceloginpage.usernameVisible()
    await sauceloginpage.acceptedUserNamesText('Accepted usernames are:')
    await sauceloginpage.passwordForallUsersText('Password for all users:')

    // Entering the username but no password to check for validations
    await sauceloginpage.standardUserLogin()
    await page.locator('#login-button').click()
    await expect(page.locator('.error-button')).toBeVisible()
    const error = await page.locator('h3').textContent()
    expect(error).toContain('Epic sadface: Password is required')

    // Entering the username and incorrect password to check for validations

    await sauceloginpage.standardUserLogin()
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

    // Verify the UI is as expected
    await expect(page.locator('.inventory_item_name').first()).toBeVisible()
    await expect(page.locator('.inventory_item_desc').first()).toBeVisible()
    await expect(page.locator('.inventory_item_price').first()).toBeVisible()
    await expect(page.locator('#add-to-cart-sauce-labs-backpack').first()).toBeVisible()
    
    // Verify the Nav bar
    await page.locator('.bm-burger-button').click()
    await expect(page.locator('.bm-menu')).toBeVisible()
    await expect(page.locator('#react-burger-cross-btn')).toBeVisible()

    // Verify the social icons
    await expect(page.locator('.footer')).toBeVisible()
    await expect(page.locator('.social_twitter')).toBeVisible()
    await expect(page.locator('.social_facebook')).toBeVisible()
    await expect(page.locator('.social_linkedin')).toBeVisible()

     // Verify the cart icon
     await expect(page.locator('#shopping_cart_container')).toBeVisible()

    // Verify the sorting dropdown
     await expect(page.locator('.select_container')).toBeVisible()











})