const {test, expect} = require('@playwright/test')

class SauceloginPage{
    constructor(page){
        this.page = page
        this.logo = page.locator('.login_logo')
        this.usernameSections = page.locator('.login_credentials')
        this.acceptedUserName = page.locator('.login_credentials h4')
        this.passwordForallUsers = page.locator('.login_password h4')
        this.usernameTextField = page.locator('#user-name')







    }
    async expectloginLogoText(text){
        await expect(this.logo).toHaveText(text)
    }
    async usernameVisible(){
        await expect(this.usernameSections).toBeVisible()
    }
    async acceptedUserNamesText(text){
        await expect(this.acceptedUserName).toHaveText(text)
    }
    async passwordForallUsersText(text){
        await expect(this.passwordForallUsers).toHaveText(text)
    }
    async standardUserLogin(){
        await this.usernameTextField.fill('standard_user')
    }

    async loginButtonClick(){
        await page.locator('#login-button').click()
    }
  








}

module.exports = {SauceloginPage}