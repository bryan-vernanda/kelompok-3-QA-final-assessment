import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import LoginPage from '../../pages/loginPage'
import PimPage from '../../pages/addEmployee'

const loginPage = new LoginPage()
const pimPage = new PimPage()

Given('user is logged in as admin', () => {
    cy.fixture('users').then((users) => {
        const user = users.standard_admin
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        loginPage.enterUsername(user.username)
        loginPage.enterPassword(user.password)
        loginPage.clickLogin()
    })
})

Given('user navigates to the PIM module', () => {
    pimPage.goToPim()
})

When('user adds a new employee with first name {string}, middle name {string}, last name {string}', (first, middle, last) => {
    pimPage.clickAddEmployee()
    pimPage.fillNameFields(first, middle, last)
    pimPage.saveEmployee()
})

When('user fills job details with joining date {string}, job title {string}, job category {string}, subunit {string}, employment status {string}', (date, title, category, subunit, status) => {
    pimPage.fillJobDetails(date, title, category, subunit, status)
})

When('user assigns a supervisor with the reporting method of {string}', (method) => {
    pimPage.assignSupervisor(method)
})

When('user tries to save without filling job details or supervisor', () => {
    // Skipping job and supervisor tabs
})

Then('the employee {string} {string} should be added successfully with a unique Employee ID and the details including job title {string}, employment status {string}, subunit {string}, and the assigned supervisor', (firstAndMiddleName, lastName, jobTitle, employmentStatus, subunit) => {
    pimPage.searchEmployee(firstAndMiddleName, lastName)
    pimPage.verifyEmployeeExists(firstAndMiddleName, lastName, jobTitle, employmentStatus, subunit)
})

Then('the system should display an error or prevent saving', () => {
    cy.get('.oxd-toast').should('not.exist')
    cy.get('.oxd-input-group input:invalid').should('exist')
})
