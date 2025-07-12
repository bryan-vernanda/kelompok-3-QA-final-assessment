// ====================
// SELECTOR CONSTANTS
// ====================

// Login
const FD_USERNAME = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input'
const FD_PASSWORD = ':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input'
const BTN_LOGIN = '.oxd-button'

// Navigation
const NAV_PIM = ':nth-child(2) > .oxd-main-menu-item'
const PAGE_HEADER = '.oxd-topbar-header-breadcrumb > .oxd-text'
const FILTER_TITLE = '.oxd-table-filter-header-title > .oxd-text'

// Add Employee
const BTN_ADD_EMPLOYEE = '.orangehrm-header-container > .oxd-button'
const INP_FIRST_NAME = '.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input'
const INP_MIDDLE_NAME = ':nth-child(2) > :nth-child(2) > .oxd-input'
const INP_LAST_NAME = ':nth-child(3) > :nth-child(2) > .oxd-input'
const INP_EMPLOYEE_ID = '.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input'
const TXT_EMPLOYEE_ID_WARNING = '.oxd-grid-2 > .oxd-grid-item'
const BTN_SAVE = '.oxd-button--secondary'
const TOAST_SUCCESS = '.oxd-toast'
const ERROR_FIRST_NAME = '.--name-grouped-field > :nth-child(1) > .oxd-text'
const ERROR_LAST_NAME = '.--name-grouped-field > :nth-child(3) > .oxd-text'

// Job Details Tab
const TAB_JOB = ':nth-child(6) > .orangehrm-tabs-item'
const INP_JOINING_DATE = '.oxd-date-input > .oxd-input'
const SELECT_JOB_TITLE = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper'
const SELECT_JOB_CATEGORY = ':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper'
const SELECT_SUBUNIT = ':nth-child(5) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper'
const SELECT_EMP_STATUS = ':nth-child(7) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper'
const BTN_SAVE_JOB = '.oxd-form-actions > .oxd-button'

// Report To Tab
const TAB_REPORT_TO = ':nth-child(8) > .orangehrm-tabs-item'
const BTN_ADD_SUPERVISOR = ':nth-child(2) > :nth-child(1) > .orangehrm-action-header > .oxd-button'
const INP_SUPERVISOR = '.oxd-autocomplete-text-input > input'
const LIST_SUPERVISOR_OPTION = '.oxd-autocomplete-option'
const SELECT_REPORT_METHOD = '.oxd-select-text'

// Search
const INP_SEARCH_NAME = ':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper input'
const INP_SEARCH_ID = ':nth-child(2) > .oxd-input'
const BTN_SEARCH = '.oxd-form-actions > .oxd-button--secondary'

// Table
const TBL_ROW = '.oxd-table-body > :nth-child(1) > .oxd-table-row'


// ====================
// CLASS DEFINITION
// ====================

class LoginPage {
    visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
  }
    enterUsername(username) {
        cy.get(FD_USERNAME).clear().should('be.visible').type(username)
    }

    enterPassword(password) {
        cy.get(FD_PASSWORD).clear().should('be.visible').type(password)
    }

    clickLogin() {
        cy.get(BTN_LOGIN).should('be.visible').click()
    }

    checkErrorMessage() {
    cy.get(".oxd-alert-content-text").should("be.visible");
  }
}

export default new LoginPage();
