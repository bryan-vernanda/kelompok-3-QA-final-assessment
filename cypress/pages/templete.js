class LoginPage {
    enterUsername(username) {
      cy.get('[data-test="username"]').clear().type(username)
    }
  
    enterPassword(password) {
      cy.get('[data-test="password"]').clear().type(password)
    }
  
    clickLogin() {
      cy.get('[data-test="login-button"]').click()
    }
}
  
module.exports = LoginPage