class PimPage {
    goToPim() {
      cy.get(':nth-child(2) > .oxd-main-menu-item').should('be.visible').click()
    }
  
    clickAddEmployee() {
      cy.get('.orangehrm-header-container > .oxd-button').should('be.visible').click()
    }
  
    fillNameFields(first, middle, last) {
      cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').should('be.visible').type(first)
      cy.get(':nth-child(2) > :nth-child(2) > .oxd-input').should('be.visible').type(middle)
      cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').should('be.visible').type(last)
    }
  
    saveEmployee() {
      cy.get('.oxd-button--secondary').should('be.visible').click()
      cy.wait(1000)
      cy.get('.oxd-toast').should('contain', 'Successfully Saved')
      cy.wait(2000)
    }
  
    fillJobDetails(date, title, category, subunit, status) {
      cy.get(':nth-child(6) > .orangehrm-tabs-item').should('be.visible').click()
      cy.get('.oxd-date-input > .oxd-input').clear().type(date)
  
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper').should('be.visible').click()
      cy.contains('.oxd-select-option', title).click()
  
      cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper').should('be.visible').click()
      cy.contains('.oxd-select-option', category).click()
  
      cy.get(':nth-child(5) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper').should('be.visible').click()
      cy.contains('.oxd-select-option', subunit).click()
  
      cy.get(':nth-child(7) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper').should('be.visible').click()
      cy.contains('.oxd-select-option', status).click()
  
      cy.get('.oxd-form-actions > .oxd-button').should('be.visible').click()
      cy.wait(1000)
      cy.get('.oxd-toast').should('contain', 'Successfully Updated')
      cy.wait(2000)
    }
  
    assignSupervisor(method) {
      cy.get(':nth-child(8) > .orangehrm-tabs-item').should('be.visible').click()
      cy.get(':nth-child(2) > :nth-child(1) > .orangehrm-action-header > .oxd-button').should('be.visible').click()
      cy.get('.oxd-autocomplete-text-input > input').type('a')
      cy.wait(3000)
      cy.get('.oxd-autocomplete-option').first().click()
  
      cy.get('.oxd-select-text').should('be.visible').click()
      cy.contains('.oxd-select-option', method).click()
  
      cy.get('.oxd-button--secondary').should('be.visible').click()
      cy.wait(1000)
      cy.get('.oxd-toast').should('contain', 'Successfully Updated')
      cy.wait(2000)
    }
  
    searchEmployee(fullName) {
      cy.get(':nth-child(2) > .oxd-main-menu-item').should('be.visible').click()
      cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper input').should('be.visible').type(fullName)
      cy.get('.oxd-form-actions > .oxd-button--secondary').should('be.visible').click()
    }
  
    verifyEmployeeExists(fullName) {
      cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row').should('contain', fullName)
    }
}
  
export default PimPage
  