const {test, expect} = require('@playwright/test')
test('Ui Validations', async({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

    // hide/enable

    await expect(page.locator('[name="show-hide"]')).toBeVisible()
    await page.locator('#hide-textbox').click()
    await expect(page.locator('[name="show-hide"]')).toBeHidden()

    // handling java based popups
    page.on('dialog', dialog=>dialog.accept())
    await page.locator('#confirmbtn').click()

    

    // Hover 
    await page.locator('#mousehover').click()

    // working on frames 
    // search for iframe on html
    const framesPage = page.frameLocator('#courses-iframe')
    framesPage.locator("li a[href*='lifetime-access']:visible").click()    

})