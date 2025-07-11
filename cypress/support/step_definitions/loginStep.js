const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const LoginPage = require('../../pages/loginPage')

const loginPage = new LoginPage()

Given('user is on the login page', () => {
  cy.visit('https://opensource-demo.orangehrmlive.com/')
  cy.url().should('include', '/web/index.php/auth/login')
})

When('user logs in using username {string} and password {string}', (username, password) => {
  loginPage.enterUsername(username)
  loginPage.enterPassword(password)
  loginPage.clickLogin()
})

Then('user should see the dashboard page', () => {
    cy.url().should('include', '/web/index.php/dashboard/index')
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('contain', 'Dashboard')
})
Then('user should see the error messages', () => {
    cy.url().should('include', '/web/index.php/auth/login')
    cy.get('.oxd-alert').should('be.visible')
})
