// ====================
// SELECTOR CONSTANTS
// ====================

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
const INP_SEARCH_ID = ':nth-child(2) > .oxd-input'
const BTN_SEARCH = '.oxd-form-actions > .oxd-button--secondary'

// Table
const TBL_ROW = '.oxd-table-body > :nth-child(1) > .oxd-table-row'
const EMP_ID_CELL         = `${TBL_ROW} > :nth-child(2)`
const EMP_FIRST_MID_CELL  = `${TBL_ROW} > :nth-child(3)`
const EMP_LAST_NAME_CELL  = `${TBL_ROW} > :nth-child(4)`
const EMP_JOB_TITLE_CELL  = `${TBL_ROW} > :nth-child(5)`
const EMP_STATUS_CELL     = `${TBL_ROW} > :nth-child(6)`
const EMP_SUBUNIT_CELL    = `${TBL_ROW} > :nth-child(7)`
const EMP_SUPERVISOR_CELL = `${TBL_ROW} > :nth-child(8)`


// ====================
// CLASS DEFINITION
// ====================

class PimPage {
    #verifyToast(message) {
        cy.get(TOAST_SUCCESS).should('contain', message)
        cy.wait(3000)
    }

    #extractEmployeeId() {
        cy.get(INP_EMPLOYEE_ID)
        .invoke('val')
        .then((employeeId) => {
            cy.wrap(employeeId).as('employeeId')
        })
    }

    #handleEmployeeIdWarning() {
        cy.get(TXT_EMPLOYEE_ID_WARNING).then(($warning) => {
            if ($warning.text().includes('Employee Id already exists')) {
                const newId = Date.now().toString().slice(0, 10)
                cy.get(INP_EMPLOYEE_ID).should('be.visible').clear().type(newId)
                cy.wrap(newId).as('employeeId')

                cy.get(BTN_SAVE).should('be.visible').click()
            }
        })
    }

    #extractAssignedSupervisor() {
        cy.get(INP_SUPERVISOR)
        .invoke('val')
        .then((fullName) => {
            const nameParts = fullName.trim().split(' ')
            const first = nameParts[0]
            const last = nameParts[nameParts.length - 1]
            const firstAndLast = `${first} ${last}`
            cy.wrap(firstAndLast).as('assignedSupervisor')
        })
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
            this.#extractEmployeeId()
        }
    }

    saveEmployee(first, last) {
        cy.get(BTN_SAVE).should('be.visible').click()

        if (first && last) {
            cy.wait(3000)
            this.#handleEmployeeIdWarning()
            this.#verifyToast('Successfully Saved')
        }
    }

    clickJobTab() {
        cy.get(TAB_JOB).should('be.visible').click()
    }

    fillJobDetails(date, title, category, subunit, status) {
        cy.get(INP_JOINING_DATE).should('be.visible').clear().type(date)

        cy.get(SELECT_JOB_TITLE).should('be.visible').click()
        cy.contains('.oxd-select-option', title).click()

        cy.get(SELECT_JOB_CATEGORY).should('be.visible').click()
        cy.contains('.oxd-select-option', category).click()

        cy.get(SELECT_SUBUNIT).should('be.visible').click()
        cy.contains('.oxd-select-option', subunit).click()

        cy.get(SELECT_EMP_STATUS).should('be.visible').click()
        cy.contains('.oxd-select-option', status).click()
    }

    saveJobDetails() {
        cy.get(BTN_SAVE_JOB).should('be.visible').click()
        this.#verifyToast('Successfully Updated')
    }

    clickReportToTab() {
        cy.get(TAB_REPORT_TO).should('be.visible').click()
    }

    clickAddSupervisor() {
        cy.get(BTN_ADD_SUPERVISOR).should('be.visible').click()
    }

    assignSupervisor(method) {
        cy.get(INP_SUPERVISOR).should('be.visible').type('a')
        cy.wait(3000)
        cy.get(LIST_SUPERVISOR_OPTION).first().click()
        this.#extractAssignedSupervisor()

        cy.get(SELECT_REPORT_METHOD).should('be.visible').click()
        cy.contains('.oxd-select-option', method).click()
    }

    saveAssignedSupervisor() {
        cy.get(BTN_SAVE).should('be.visible').click()
        this.#verifyToast('Successfully Saved')
    }

    searchEmployee() {
        cy.get('@employeeId').then((id) => {
            cy.get(INP_SEARCH_ID).should('be.visible').type(id)
        })

        cy.get(BTN_SEARCH).should('be.visible').click()
    }

    verifyEmployeeExists(firstAndMiddleName, lastName, jobTitle, employmentStatus, subunit) {
        cy.get('@employeeId').then((id) => {
            cy.get(`${EMP_ID_CELL}`).should('contain', id)
        })
    
        cy.get(`${EMP_FIRST_MID_CELL}`).should('contain', firstAndMiddleName)
        cy.get(`${EMP_LAST_NAME_CELL}`).should('contain', lastName)
        cy.get(`${EMP_JOB_TITLE_CELL}`).should('contain', jobTitle)
        cy.get(`${EMP_STATUS_CELL}`).should('contain', employmentStatus)
        cy.get(`${EMP_SUBUNIT_CELL}`).should('contain', subunit)
    
        cy.get('@assignedSupervisor').then((supervisor) => {
            cy.get(`${EMP_SUPERVISOR_CELL}`).should('contain', supervisor)
        })        
    }

    verifyFirstNameRequired() {
        cy.get(ERROR_FIRST_NAME).should('contain', 'Required')
    }
      
    verifyLastNameRequired() {
        cy.get(ERROR_LAST_NAME).should('contain', 'Required')
    }
      
}

export default PimPage
