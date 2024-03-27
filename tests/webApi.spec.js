const {test, expect, request} = require('@playwright/test')
const loginPayload = {userEmail:"testplaywright@gmail.com",userPassword:"Melbourne$15"}
let token

test.beforeAll (async()=>{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://www.rahulshettyacademy.com/api/ecom/auth/login",{
        data : loginPayload
    })
               
    // console.log(await loginResponse.json())
            
               expect(loginResponse.ok()).toBeTruthy()
             const loginResponseJson = await loginResponse.json()
               token = loginResponseJson.token
            //   console.log(token)


})












test('ecom test', async({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    page.addInitScript(value => {
        window.localStorage.setItem('token',value)
    }, token)

    await page.goto('https://www.rahulshettyacademy.com/client')

    // await page.goto('https://www.rahulshettyacademy.com/client')
    // await page.locator('#userEmail').fill('testplaywright@gmail.com')
    // await page.locator('#userPassword').fill('Melbourne$15')
    // await page.locator('#login').click()
    await page.locator('.card-body').nth(0).waitFor()

    const products= page.locator('.card-body')
    const productCount = await products.count()
    const selectProduct = 'IPHONE 13 PRO'

    for (let i = 0; i< productCount; i++){

    // chaining locator from parent
        if (await products.nth(i).locator('b').textContent()=== selectProduct){
            await products.nth(i).locator('text = Add To Cart').click()
            break;
        }
    }
    await page.waitForLoadState('networkidle')

   // psuedo class using has-text
    await page.locator('[routerlink*="cart"]').click()
    await page.locator('.cartSection h3').nth(0).waitFor()
    const productOnCartPage = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible()
    expect(productOnCartPage).toBeTruthy()


 // selecting a value from suggestive dropdwon and using a new pressSequentially command
    await page.locator('text=Checkout').click()
    await page.locator('.item__title').waitFor()
    await page.locator('[placeholder*="Country"]').pressSequentially('Ind')

    const dropdown =  page.locator('.ta-results')
    await dropdown.waitFor()
    const optionsCount = await dropdown.locator('button').count()

    for (let i=0 ; i<optionsCount ; i++ ){
        if (await dropdown.locator('button').nth(i).textContent() === ' India'){
            await dropdown.locator('button').nth(i).click()
            break;
        }
    }

    await page.locator('text=Place Order ').click()

    // grabbing the oder id from the screen 
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const screenId= await page.locator('.em-spacer-1 .ng-star-inserted').textContent()
    console.log(screenId)
    const orderIDsplit =screenId.split(" ")[2]
    console.log(orderIDsplit)

    // clicking on orders to find the text 
    await page.locator('button[routerlink*="myorders"]').click()
    await page.locator("tbody").waitFor();

    const rows =  page.locator('tr.ng-star-inserted')
    // const rowsCount = await rows.count()

    for (let i=0; i < await rows.count(); i++){
       const yourOrderId =  await rows.nth(i).locator('th').textContent()
       if(orderIDsplit.includes(yourOrderId)){
        await rows.nth(i).locator("button").first().click();
        break;
       }

      
    }




    









})