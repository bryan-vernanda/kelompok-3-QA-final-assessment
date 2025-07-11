const FD_USERNAME = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input'
const FD_PASSWORD = ':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input'
const BTN_LOGIN = '.oxd-button'

class LoginPage {
    enterUsername(username) {
        cy.get(FD_USERNAME).clear().should('be.visible').type(username)
    }

    enterPassword(password) {
        cy.get(FD_PASSWORD).clear().should('be.visible').type(password)
    }

    clickLogin() {
        cy.get(BTN_LOGIN).should('be.visible').click()
    }
}

module.exports = LoginPage