import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import LoginPage from '../../pages/loginPage'
import ClaimPage from '../../pages/claimPage'

const loginPage = new LoginPage()
const claimPage = new ClaimPage()

Given('user is logged in as Admin', () => {
    cy.fixture('users').then((users) => {
        const user = users.standard_admin
        loginPage.visitLoginPage()
        loginPage.assertOnLoginPage()
        loginPage.enterUsername(user.username)
        loginPage.enterPassword(user.password)
        loginPage.clickLogin()
    })
})

Given('user navigates to the Claim page', () => {
    claimPage.goToClaim()
    claimPage.assertOnClaimPage()
})

When('user assigns a new claim for {string} with event {string}, currency {string}, and the description {string}', (employee, event, currency, description) => {
    claimPage.clickAssignClaim()
    claimPage.createClaimRequest(employee, event, currency, description)
    claimPage.clickCreateButton()
})

When('user adds an expense of type {string} on {string} with amount {string}', (expense, date, amount) => {
    claimPage.clickExpenseButton()
    claimPage.fillExpenseDetails(expense, date, amount)
    claimPage.saveExpenses(expense, date, amount)
})

When('user submits the claim request', () => {
    claimPage.submitClaim()
})

Then('a claim request for {string} should be successfully created with a unique Reference ID and the details including event name {string}, description {string}, currency {string}, amount {string}, the submitted date, and its status', (employee, event, description, currency, amount) => {
    claimPage.pressBack()
    claimPage.assertOnClaimPage()
    claimPage.searchClaim()
    claimPage.verifyClaimExists(event, description, currency, amount)
})

Then('an error message {string} should appear, preventing the claim expense to be added', (outcome) => {
    claimPage.verifyErrorDisplayMessage(outcome)
})