const LOGIN_TITLE = '.oxd-text--h5'
const FD_USERNAME = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input'
const FD_PASSWORD = ':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input'
const BTN_LOGIN = '.oxd-button'
const DASHBOARD_TITLE = '.oxd-topbar-header-breadcrumb > .oxd-text'
const LOGIN_ALERT = '.oxd-alert'

class LoginPage {
    visitLoginPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
    }

    assertOnLoginPage() {
        cy.url().should('include', '/web/index.php/auth/login')
        cy.get(LOGIN_TITLE).should('contain', 'Login')
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

    assertOnDashboardPage() {
        cy.url().should('include', '/web/index.php/dashboard/index')
        cy.get(DASHBOARD_TITLE).should('contain', 'Dashboard')
    }

    assertOnErrorPage() {
        cy.get(LOGIN_ALERT).should('be.visible')
    }
}

module.exports = LoginPage