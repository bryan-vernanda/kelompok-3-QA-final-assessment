import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import LoginPage from '../../pages/loginPage'
import PimPage from '../../pages/pimPage'

const loginPage = new LoginPage()
const pimPage = new PimPage()

Given('user is logged in as admin', () => {
    cy.fixture('users').then((users) => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        loginPage.enterUsername(users.admin.username)
        loginPage.enterPassword(users.admin.password)
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

Then('the employee {string} should be added successfully', (fullName) => {
    pimPage.searchEmployee(fullName)
    pimPage.verifyEmployeeExists(fullName)
})

Then('the system should display an error or prevent saving', () => {
    cy.get('.oxd-toast').should('not.exist')
    cy.get('.oxd-input-group input:invalid').should('exist')
})
