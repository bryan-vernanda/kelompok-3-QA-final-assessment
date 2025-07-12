import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import AddClaim from '../../pages/AddClaim'

const AddClaim = new AddClaim()

Given('user is logged in as Admin'), () => {
    cy.fixture('users').then((users) => {
        const user = users.standard_admin
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        AddClaim.enterUsername(user.username)
        AddClaim.enterPassword(user.password)
        AddClaim.clickLogin()
    })
}

And('user navigates to Claim page'), () => {
    AddClaim.toClaim()
    AddClaim.assertOnClaimPage()
}

When('user clicks on +Assign Claim button'), () => {
    AddClaim.clickAssignClaim()
}

Then('user creates claim request with employee name {string}, {string} as event, and {string} as the currency'), (employee, event, currency) => {
    AddClaim.createClaimRequest(employee, event, currency)
}

And('user clicks the create button'), () => {
    AddClaim.clickCreateButton()
}

Then('user clicks on +Add button to assign {string} as expense type, {string} as the date, and set the amount of currency as {string}'), (expense, date, amount) => {
    AddClaim.addExpenses(expense, date, amount)
}

And('user clicks the Save button'), () => {
    AddClaim.saveExpenses()
}

And('user clicks the Submit button to submit the data'), () => {
    AddClaim.submitClaim()
}

And('user press back'), () => {
    AddClaim.pressBack()
}

Then('claim request of {string} should be created'), (employee) => {
    AddClaim.searchClaim(employee)
}