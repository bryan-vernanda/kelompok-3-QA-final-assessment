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

class PimPage {
    #verifyToast(message) {
        cy.get(TOAST_SUCCESS).should('contain', message)
        cy.wait(2000)
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

    goToPim() {
        cy.get(NAV_PIM).should('be.visible').click()
    }

    assertOnPimPage() {
        cy.url().should('include', '/web/index.php/pim/viewEmployeeList')
        cy.get(PAGE_HEADER).should('contain', 'PIM')
        cy.get(FILTER_TITLE).should('contain', 'Employee Information')
    }

    clickAddEmployee() {
        cy.get(BTN_ADD_EMPLOYEE).should('be.visible').click()
    }

    fillNameFields(first, middle, last) {
        if (first) cy.get(INP_FIRST_NAME).should('be.visible').type(first)
        if (middle) cy.get(INP_MIDDLE_NAME).should('be.visible').type(middle)
        if (last) cy.get(INP_LAST_NAME).should('be.visible').type(last)

        if (first && last) {
            cy.get(INP_EMPLOYEE_ID)
            .invoke('val')
            .then((employeeId) => {
                cy.wrap(employeeId).as('employeeId')
            })
        }
    }

    saveEmployee(first, last) {
        cy.get(BTN_SAVE).should('be.visible').click()

        if (first && last) {
            cy.wait(2000)

            cy.get('body').then(($body) => {
                const warningText = $body.find(TXT_EMPLOYEE_ID_WARNING).text()

                if (warningText.includes('Employee Id already exists')) {
                    const newId = Date.now().toString().slice(0, 10)
                    cy.get(INP_EMPLOYEE_ID).should('be.visible').clear().type(newId)
                    cy.wrap(newId).as('employeeId')

                    cy.get(BTN_SAVE).should('be.visible').click()
                }
            })

            this.#verifyToast('Successfully Saved')
        }
    }

    fillJobDetails(date, title, category, subunit, status) {
        cy.get(TAB_JOB).should('be.visible').click()
        cy.get(INP_JOINING_DATE).should('be.visible').clear().type(date)

        cy.get(SELECT_JOB_TITLE).should('be.visible').click()
        cy.contains('.oxd-select-option', title).click()

        cy.get(SELECT_JOB_CATEGORY).should('be.visible').click()
        cy.contains('.oxd-select-option', category).click()

        cy.get(SELECT_SUBUNIT).should('be.visible').click()
        cy.contains('.oxd-select-option', subunit).click()

        cy.get(SELECT_EMP_STATUS).should('be.visible').click()
        cy.contains('.oxd-select-option', status).click()

        cy.get(BTN_SAVE_JOB).should('be.visible').click()
        this.#verifyToast('Successfully Updated')
    }

    assignSupervisor(method) {
        cy.get(TAB_REPORT_TO).should('be.visible').click()
        cy.get(BTN_ADD_SUPERVISOR).should('be.visible').click()
        cy.get(INP_SUPERVISOR).should('be.visible').type('a')
        cy.wait(2000)
        cy.get(LIST_SUPERVISOR_OPTION).first().click()
        .invoke('val')
        .then((assignedSupervisor) => {
            cy.wrap(assignedSupervisor).as('assignedSupervisor')
        })

        cy.get(SELECT_REPORT_METHOD).should('be.visible').click()
        cy.contains('.oxd-select-option', method).click()

        cy.get(BTN_SAVE).should('be.visible').click()
        this.#verifyToast('Successfully Saved')
    }

    searchEmployee(firstAndMiddleName, lastName) {
        cy.get(NAV_PIM).should('be.visible').click()
        cy.get(INP_SEARCH_NAME).should('be.visible').type(`${firstAndMiddleName} ${lastName}`)
        cy.get('@employeeId').then((id) => {
            cy.get(INP_SEARCH_ID).should('be.visible').type(id)
        })
        cy.get(BTN_SEARCH).should('be.visible').click()
    }

    verifyEmployeeExists(firstAndMiddleName, lastName, jobTitle, employmentStatus, subunit) {
        cy.get('@employeeId').then((id) => {
            cy.get(`${TBL_ROW} > :nth-child(2)`).should('contain', id)
        })
        cy.get(`${TBL_ROW} > :nth-child(3)`).should('contain', firstAndMiddleName)
        cy.get(`${TBL_ROW} > :nth-child(4)`).should('contain', lastName)
        cy.get(`${TBL_ROW} > :nth-child(5)`).should('contain', jobTitle)
        cy.get(`${TBL_ROW} > :nth-child(6)`).should('contain', employmentStatus)
        cy.get(`${TBL_ROW} > :nth-child(7)`).should('contain', subunit)
        cy.get('@assignedSupervisor').then((supervisor) => {
            cy.get(`${TBL_ROW} > :nth-child(8)`).should('contain', supervisor)
        })
    }

    verifyFirstNameRequired() {
        cy.get(ERROR_FIRST_NAME).should('contain', 'Required')
    }
      
    verifyLastNameRequired() {
        cy.get(ERROR_LAST_NAME).should('contain', 'Required')
    }
      
    verifyFirstAndLastNameRequired() {
        this.verifyFirstNameRequired()
        this.verifyLastNameRequired()
    }
      
}

export default PimPage
