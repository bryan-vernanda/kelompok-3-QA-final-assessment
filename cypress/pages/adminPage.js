// ====================
// SELECTOR CONSTANTS
// ====================

// Admin Page
const MENU_ADMIN = ':nth-child(1) > .oxd-main-menu-item'
const PAGE_HEADER = '.oxd-topbar-header-breadcrumb-module'
const FILTER_TITLE = '.oxd-table-filter-header-title > .oxd-text'
const BTN_ADD_USER = '.orangehrm-header-container > .oxd-button'

// Add Admin
const SELECT_USER_ROLE = ':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper'
const INPUT_EMPLOYEE_NAME = '.oxd-autocomplete-text-input > input'
const FIRST_AUTOCOMPLETE_OPTION = '.oxd-autocomplete-option'
const SELECT_STATUS = ':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper'
const INPUT_USERNAME = ':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input'
const TXT_USERNAME_WARNING = '.oxd-grid-2 > :nth-child(4)'
const INPUT_PASSWORD = '.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input'
const INPUT_CONFIRM_PASSWORD = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input'
const BTN_SAVE = '.oxd-button--secondary'
const TOAST_SUCCESS = '.oxd-toast'
const INPUT_SEARCH_USERNAME = ':nth-child(2) > .oxd-input'
const BTN_SEARCH = '.oxd-form-actions > .oxd-button--secondary'
const PASSWORD_VALIDATION = '.user-password-cell > .oxd-input-group'
const TXT_ERROR_PASSWORD = [
    'Your password must contain minimum 1 number',
    'Should have at least 7 characters',
    'Your password must contain minimum 1 lower-case letter'
]

// Table
const TBL_ROW = '.oxd-table-card > .oxd-table-row'
const USER_USERNAME = `${TBL_ROW} > :nth-child(2)`
const USER_ROLE     = `${TBL_ROW} > :nth-child(3)`
const USER_EMP_NAME = `${TBL_ROW} > :nth-child(4)`
const USER_STATUS   = `${TBL_ROW} > :nth-child(5)`


// ====================
// CLASS DEFINITION
// ====================

class AdminPage {
    #handleUsernameWarning(newUsername) {
        cy.get(TXT_USERNAME_WARNING).then(($warning) => {
            if ($warning.text().includes('Already exists')) {
                const uniqueUsername = `${newUsername}-${Date.now()}`
                cy.wrap(uniqueUsername).as('createdUsername')
                cy.get(INPUT_USERNAME).should('be.visible').clear().type(uniqueUsername)
            } else {
                cy.wrap(newUsername).as('createdUsername')
            }
        })
    }

    #extractFirstAndLastName(fullName) {
        const nameParts = fullName.trim().split(' ')
        const first = nameParts[0]
        const last = nameParts[nameParts.length - 1]
        return `${first} ${last}`
    }

    #handleTextErrorPassword() {
        cy.get(PASSWORD_VALIDATION)
        .invoke('text')
        .then((text) => {
            const hasError = TXT_ERROR_PASSWORD.some((msg) => text.includes(msg))

            if (!hasError) {
                cy.get(TOAST_SUCCESS).should('contain', 'Successfully Saved')
                cy.wait(5000)
            }
        })
    }

    goToAdminPage() {
        cy.get(MENU_ADMIN).should('be.visible').click()
    }

    assertOnAdminPage() {
        cy.url().should('include', '/web/index.php/admin/viewSystemUsers')
        cy.get(PAGE_HEADER).should('contain', 'Admin')
        cy.get(FILTER_TITLE).should('contain', 'System User')
    }

    clickAddUser() {
        cy.get(BTN_ADD_USER).should('be.visible').click()
    }

    fillAddAdminFields(newUsername, password, role, status, employee) {
        cy.get(SELECT_USER_ROLE).should('be.visible').click()
        cy.contains('.oxd-select-option', role).should('be.visible').click()

        cy.get(INPUT_EMPLOYEE_NAME).should('be.visible').type(employee)
        cy.wait(3000)
        cy.get(FIRST_AUTOCOMPLETE_OPTION).first().click()

        cy.get(SELECT_STATUS).should('be.visible').click()
        cy.contains('.oxd-select-option', status).should('be.visible').click()

        cy.get(INPUT_USERNAME).should('be.visible').type(newUsername)
        cy.wait(3000)
        this.#handleUsernameWarning(newUsername)

        cy.get(INPUT_PASSWORD).should('be.visible').type(password)
        cy.get(INPUT_CONFIRM_PASSWORD).should('be.visible').type(password)
        cy.wait(3000)
    }

    saveUser() {
        cy.get(BTN_SAVE).should('be.visible').click()

        this.#handleTextErrorPassword()
    }

    searchUser() {
        cy.get('@createdUsername').then((actualUsername) => {
            cy.get(INPUT_SEARCH_USERNAME).should('be.visible').type(actualUsername)
        })

        cy.get(BTN_SEARCH).should('be.visible').click()
    }

    assertUserExists(role, employee, status) {
        cy.get('@createdUsername').then((actualUsername) => {
            cy.get(`${USER_USERNAME}`).should('contain', actualUsername)
        })

        cy.get(`${USER_ROLE}`).should('contain', role)
        cy.get(`${USER_EMP_NAME}`).should('contain', this.#extractFirstAndLastName(employee))
        cy.get(`${USER_STATUS}`).should('contain', status)
    }

    assertPasswordErrorValidation(outcome) {
        cy.get(PASSWORD_VALIDATION).should('be.visible').should('contain', outcome)
    }
}

export default AdminPage
  