// @ts-check
const {  devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  timeout: 60 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  workers:3,
  retries: 1,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    browserName: 'chromium',
    headless: false,
    trace: 'retain-on-failure'
   
  },

  /* Configure projects for major browsers */
  

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
}


module.exports = config;