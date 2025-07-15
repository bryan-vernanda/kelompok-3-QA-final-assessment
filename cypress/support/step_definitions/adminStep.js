import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import LoginPage from '../../pages/loginPage'
import AdminPage from '../../pages/adminPage'

const loginPage = new LoginPage()
const adminPage = new AdminPage()

Given('user is logged in as standard admin user', () => {
    cy.fixture('users').then((users) => {
        const user = users.standard_admin
        loginPage.visitLoginPage()
        loginPage.assertOnLoginPage()
        loginPage.enterUsername(user.username)
        loginPage.enterPassword(user.password)
        loginPage.clickLogin()
    })
})

Given('user navigates to Admin page', () => {
    adminPage.goToAdminPage()
    adminPage.assertOnAdminPage()
})

When('user adds a new admin with username {string}, password {string}, role {string}, status {string}, and associated employee {string}', (newUsername, password, role, status, employee) => {
    adminPage.clickAddUser()
    adminPage.fillAddAdminFields(newUsername, password, role, status, employee)
    adminPage.saveUser()
})
  
Then('the admin {string} with its unique username should appear in the user list with details including the user role {string}, employee name {string}, and status {string}', (newUsername, role, employee, status) => {
    adminPage.searchUser()
    adminPage.assertUserExists(role, employee, status)
})

Then('the system should show password error validation message {string}', (outcome) => {
    adminPage.assertPasswordErrorValidation(outcome)
})