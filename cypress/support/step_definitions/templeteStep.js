const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const LoginPage = require('../../pages/templete')

const loginPage = new LoginPage()

Given('I open the SauceDemo login page', () => {
  cy.visit('https://www.saucedemo.com/')
})

When('I fill in username {string} and password {string}', (username, password) => {
  loginPage.enterUsername(username)
  loginPage.enterPassword(password)
})

When('I click the login button', () => {
  loginPage.clickLogin()
})

Then('I should see the login success', () => {
  cy.url().should('include', '/inventory.html')
})
Then('I should see the login failure', () => {
  cy.url().should('include', '');
  cy.get('[data-test="error"]').should('be.visible')
})
