import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import LoginPage from '../../pages/loginPage'
import PimPage from '../../pages/pimPage'

const loginPage = new LoginPage()
const pimPage = new PimPage()

Given('user is logged in as admin', () => {
    cy.fixture('users').then((users) => {
        const user = users.standard_admin
        loginPage.visitLoginPage()
        loginPage.assertOnLoginPage()
        loginPage.enterUsername(user.username)
        loginPage.enterPassword(user.password)
        loginPage.clickLogin()
    })
})

Given('user navigates to the PIM module', () => {
    pimPage.goToPim()
    pimPage.assertOnPimPage()
})

When('user adds a new employee with first name {string}, middle name {string}, last name {string}', (first, middle, last) => {
    pimPage.clickAddEmployee()
    pimPage.fillNameFields(first, middle, last)
    pimPage.saveEmployee(first, last)
})

When('user fills job details with joining date {string}, job title {string}, job category {string}, subunit {string}, employment status {string}', (date, title, category, subunit, status) => {
    pimPage.clickJobTab()
    pimPage.fillJobDetails(date, title, category, subunit, status)
    pimPage.saveJobDetails()
})

When('user assigns a supervisor with the reporting method of {string}', (method) => {
    pimPage.clickReportToTab()
    pimPage.clickAddSupervisor()
    pimPage.assignSupervisor(method)
    pimPage.saveAssignedSupervisor()
})

Then('the employee {string} {string} should be added successfully with a unique Employee ID and the details including job title {string}, employment status {string}, subunit {string}, and the assigned supervisor', (firstAndMiddleName, lastName, jobTitle, employmentStatus, subunit) => {
    pimPage.goToPim()
    pimPage.assertOnPimPage()
    pimPage.searchEmployee()
    pimPage.assertEmployeeExists(firstAndMiddleName, lastName, jobTitle, employmentStatus, subunit)
})

Then('the system should display an error saying "last name cannot be empty"', () => {
    pimPage.assertLastNameRequired()
})

Then('the system should display an error saying "first name cannot be empty"', () => {
    pimPage.assertFirstNameRequired()
})

Then('the system should display an error saying "first name and last name cannot be empty"', () => {
    pimPage.assertFirstNameRequired()
    pimPage.assertLastNameRequired()
})