// Login
const LOGIN_USERNAME = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input'
const LOGIN_PASSWORD = ':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input'
const LOGIN_BUTTON = '.oxd-button'

// Navigation
const CLAIM_MENU = ':nth-child(11) > .oxd-main-menu-item'
const PAGE_HEADER = '.oxd-topbar-header-breadcrumb > .oxd-text'

// Claim Menu
const ASSIGN_CLAIM = '.orangehrm-header-container > .oxd-button'
const EMP_NAME = '.oxd-autocomplete-text-input > input'
const SELECT_EVENT = ':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'
const SELECT_CURR = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'
const CREATE_BUTTON = '.oxd-button--secondary'
const ADD_BUTTON = ':nth-child(3) > .orangehrm-action-header > .oxd-button'
const SUBMIT_BUTTON = '.oxd-button--secondary'
const EXPENSE_TYPE = '.oxd-select-text'
const INPUT_DATE = '.oxd-date-input > .oxd-input'
const INPUT_AMOUNT = '.oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input'
const SAVE_BUTTON = '.oxd-form-actions > .oxd-button--secondary'
const BACK_BUTTON = '.oxd-button'

// Search
const SEARCH_NAME = ':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input'
const SEARCH_BUTTON = '.oxd-form-actions > .oxd-button--secondary'
const TABLE_EMPLOYEE = '.oxd-table-card > .oxd-table-row > :nth-child(2)'


class AddClaim{
    enterUsername(username) {
        cy.get(LOGIN_USERNAME_USERNAME).clear().should('be.visible').type(username)
    }

    enterPassword(password) {
        cy.get(LOGIN_PASSWORD).clear().should('be.visible').type(password)
    }

    clickLogin() {
        cy.get(LOGIN_BUTTON).should('be.visible').click()
    }

    toClaim(){
        cy.get(CLAIM_MENU).should('be.visible').click()
    }

    assertOnClaimPage(){
        cy.url().should('include', '/claim/viewAssignClaim')
        cy.get(PAGE_HEADER).should('contain', 'Claim')
    }

    clickAssignClaim(){
        cy.get(ASSIGN_CLAIM).should('be.visible').click()
    }

    createClaimRequest(employee, event, currency){
        cy.get(EMP_NAME).should('be.visible').type(employee)
        cy.get(SELECT_EVENT).should('be.visible').type(event)
        cy.get(SELECT_CURR).should('be.visible').type(currency)
    }

    clickCreateButton(){
        cy.get(CREATE_BUTTON).should('be.visible').click()
    }

    addExpenses(expense, date, amount){
        cy.get(ADD_BUTTON).should('be.visible').click()
        cy.get(EXPENSE_TYPE).should('be.visible').type(expense)
        cy.get(INPUT_DATE).should('be.visible').type(date)
        cy.get(INPUT_AMOUNT).should('be.visible').type(amount)
    }

    saveExpenses(){
        cy.get(SAVE_BUTTON).should('be.visible').click()
    }

    submitClaim(){
        cy.get(SUBMIT_BUTTON).should('be.visible').click()
    }

    pressBack(){
        cy.get(BACK_BUTTON).should('be.visible').click()
    }

    searchClaim(employee){
        cy.get(SEARCH_NAME).should('be.visible').type(employee)
        cy.get(SEARCH_BUTTON).should('be.visible').click()
        cy.get(TABLE_EMPLOYEE).should('contain', employee)
    }
}

export default AddClaim