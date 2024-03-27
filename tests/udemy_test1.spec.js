const {test, expect} = require('@playwright/test')
const { BlockList } = require('net')

// Test to check for wait issue by using textContent() and waitFor() 
test('udemy test 1', async ({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    const signIn = page.locator('[name="signin"]')
    const userName = page.locator('[name="username"]')
    const password = page.locator('[name="password"]')

    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
    await userName.fill('rahulshettyacademy')
    await password.fill('learning122')
    await signIn.click()
    console.log(await page.locator('[style ="display: block;"]').textContent())
    await userName.fill('rahulshettyacademy')
    await password.fill('learning')
    await signIn.click()

    await page.url().includes('shop')
    await page.locator('.card-title a').nth(0).waitFor()
    console.log(await page.locator('.card-title a').allTextContents())
    await page.goBack()


})

// Dropdowns (Select), radio buttons and web based popups, checboxes
test('udemt test for UI', async({browser}) =>{
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
    const dropdown = page.locator('select.form-control')
    const radiobuttonAdmin =  page.locator('[value="admin"]')
    const radiobuttonUser =  page.locator('[value="user"]')
    const okayModal = page.locator('#okayBtn')
    const checkbox = page.locator('#terms')

    await dropdown.selectOption('consult')
    await expect(dropdown).toHaveValue('consult')

    await radiobuttonUser.click()
    await expect(page.locator('.modal-body')).toBeVisible()
    await okayModal.click()
    await expect(radiobuttonUser).toBeChecked()

    await checkbox.check()
    await expect(checkbox).toBeChecked()
    await checkbox.uncheck()
    expect(await page.locator('#terms').isChecked()).toBeFalsy()
    // expect(checkbox.isChecked()).toBeFalsy()
    

})


// Handling new page 
test('handling new page', async ({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    const blinkingText = page.locator('.blinkingText')
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinkingText.click()
    ])

    const redText = await newPage.locator('.red').textContent()
    // console.log(redText)


    // Using split to fetch value from a text 
    const text1 = redText.split('@')
    const text2 = text1[1].split(' ')[0]
    console.log(text2)
    
    
    

})
