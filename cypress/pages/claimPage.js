// ====================
// SELECTOR CONSTANTS
// ====================

// Navigation
const CLAIM_MENU = ':nth-child(11) > .oxd-main-menu-item'
const PAGE_HEADER = '.oxd-topbar-header-breadcrumb > .oxd-text'
const FILTER_TITLE = '.oxd-table-filter-header-title > .oxd-text'

// Claim Menu
const ASSIGN_CLAIM = '.orangehrm-header-container > .oxd-button'
const EMP_NAME = '.oxd-autocomplete-text-input > input'
const EMP_NAME_OPTION = '.oxd-autocomplete-option'
const SELECT_EVENT = ':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'
const SELECT_CURR = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'
const DESCRIPTION = '.oxd-textarea'
const CREATE_BUTTON = '.oxd-button--secondary'
const TOAST_SUCCESS = '.oxd-toast'
const GNRT_EMP_NAME = ':nth-child(1) > .oxd-grid-3 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input'
const GNRT_REF_ID = ':nth-child(2) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'

// Add Expense
const ADD_BUTTON = ':nth-child(3) > .orangehrm-action-header > .oxd-button'
const SUBMIT_BUTTON = '.oxd-button--secondary'
const EXPENSE_TYPE = '.oxd-select-text'
const INPUT_DATE = '.oxd-date-input > .oxd-input'
const INPUT_AMOUNT = '.oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input'
const SAVE_BUTTON = '.oxd-form-actions > .oxd-button--secondary'
const BACK_BUTTON = '.oxd-button'
const ERROR_EXPENSE_TYPE = ':nth-child(1) > .oxd-grid-1 > .oxd-grid-item > .oxd-input-group'
const ERROR_DATE_FORMAT = '.oxd-grid-2 > :nth-child(1) > .oxd-input-group'
const ERROR_AMOUNT_FORMAT = '.oxd-grid-2 > :nth-child(2) > .oxd-input-group'
const ERROR_SELECTORS = {
    'Required': ERROR_EXPENSE_TYPE,
    'Should be a valid date in yyyy-dd-mm format': ERROR_DATE_FORMAT,
    'Should be a valid number (xxx.xx)': ERROR_AMOUNT_FORMAT
}

// Search
const SEARCH_REF_ID = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input'
const SEARCH_BUTTON = '.oxd-form-actions > .oxd-button--secondary'
const TABLE_EMPLOYEE = '.oxd-table-card > .oxd-table-row > :nth-child(2)'

// Table
const TBL_ROW = '.oxd-table-body > :nth-child(1) > .oxd-table-row'
const CLAIM_REF_ID_CELL      = `${TBL_ROW} > :nth-child(1)`
const CLAIM_EMPLOYEE_CELL    = `${TBL_ROW} > :nth-child(2)`
const CLAIM_EVENT_CELL       = `${TBL_ROW} > :nth-child(3)`
const CLAIM_DESCRIPTION_CELL = `${TBL_ROW} > :nth-child(4)`
const CLAIM_CURRENCY_CELL    = `${TBL_ROW} > :nth-child(5)`
const CLAIM_AMOUNT_CELL      = `${TBL_ROW} > :nth-child(8)`


// ====================
// CLASS DEFINITION
// ====================

class ClaimPage{
    #assertToast() {
        cy.get(TOAST_SUCCESS).should('contain', 'Successfully Saved')
        cy.wait(3000)
    }

    #extractClaimData(selector, aliasName) {
        cy.get(selector)
        .invoke('val')
        .then((value) => {
            cy.wrap(value).as(aliasName)
        })
    }

    #isValidDateFormat(date) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        return dateRegex.test(date);
    }

    #isNumericOnly(num) {
        const numericRegex = /^\d+(\.\d+)?$/;
        return numericRegex.test(num);
    }

    #formatAmountOfMoney(amount) {
        return Number(amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    }

    goToClaim(){
        cy.get(CLAIM_MENU).should('be.visible').click()
    }

    assertOnClaimPage(){
        cy.url().should('include', 'web/index.php/claim/viewAssignClaim')
        cy.get(PAGE_HEADER).should('contain', 'Claim')
        cy.get(FILTER_TITLE).should('contain', 'Employee Claims')
    }

    clickAssignClaim(){
        cy.get(ASSIGN_CLAIM).should('be.visible').click()
    }

    createClaimRequest(employee, event, currency, description){
        cy.get(EMP_NAME).should('be.visible').type(employee)
        cy.wait(3000)
        cy.get(EMP_NAME_OPTION).first().click()

        cy.get(SELECT_EVENT).should('be.visible').click()
        cy.contains('.oxd-select-option', event).click()

        cy.get(SELECT_CURR).should('be.visible').click()
        cy.contains('.oxd-select-option', currency).click()

        cy.get(DESCRIPTION).should('be.visible').type(description)
    }

    clickCreateButton(){
        cy.get(CREATE_BUTTON).should('be.visible').click()
        this.#assertToast()
        this.#extractClaimData(GNRT_EMP_NAME, 'generatedEmployeeName')
        this.#extractClaimData(GNRT_REF_ID, 'generatedReferenceId')
    }

    clickExpenseButton(){
        cy.get(ADD_BUTTON).should('be.visible').click()
    }

    fillExpenseDetails(expense, date, amount){
        if (expense) {
            cy.get(EXPENSE_TYPE).should('be.visible').click()
            cy.contains('.oxd-select-option', expense).click()
        }

        cy.get(INPUT_DATE).should('be.visible').type(date)

        cy.get(INPUT_AMOUNT).should('be.visible').type(amount)
    }

    saveExpenses(expense, date, amount){
        cy.get(SAVE_BUTTON).should('be.visible').click()

        if (expense && this.#isValidDateFormat(date) && this.#isNumericOnly(amount)) {
            this.#assertToast()
        }
    }

    submitClaim(){
        cy.get(SUBMIT_BUTTON).should('be.visible').click()
        this.#assertToast()
    }

    pressBack(){
        cy.get(BACK_BUTTON).should('be.visible').click()
    }

    searchClaim(){
        cy.get('@generatedReferenceId').then((refId) => {
            cy.get(SEARCH_REF_ID).should('be.visible').type(refId)
        })

        cy.get(SEARCH_BUTTON).should('be.visible').click()
    }

    assertClaimExists(event, description, currency, amount) {
        cy.get('@generatedReferenceId').then((refId) => {
            cy.get(`${CLAIM_REF_ID_CELL}`).should('contain', refId)
        })
    
        cy.get('@generatedEmployeeName').then((genEmpName) => {
            cy.get(`${CLAIM_EMPLOYEE_CELL}`).should('contain', genEmpName)
        })
    
        cy.get(`${CLAIM_EVENT_CELL}`).should('contain', event)
        cy.get(`${CLAIM_DESCRIPTION_CELL}`).should('contain', description)
        cy.get(`${CLAIM_CURRENCY_CELL}`).should('contain', currency)
        cy.get(`${CLAIM_AMOUNT_CELL}`).should('contain', this.#formatAmountOfMoney(amount))
    }

    assertErrorDisplayMessage(message) {
        if (message === 'Expense Type is required') {
            message = 'Required'
        }

        cy.get(ERROR_SELECTORS[message]).should('be.visible').and('contain', message)
    }

}

export default ClaimPage