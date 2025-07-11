class PimPage {
    goToPim() {
        cy.get(':nth-child(2) > .oxd-main-menu-item').should('be.visible').click()
    }
  
    clickAddEmployee() {
        cy.get('.orangehrm-header-container > .oxd-button').should('be.visible').click()
    }
  
    fillNameFields(first, middle, last) {
        if (first) {
            cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').should('be.visible').type(first)
        }
        if (middle) {
            cy.get(':nth-child(2) > :nth-child(2) > .oxd-input').should('be.visible').type(middle)
        }
        if (last) {
            cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').should('be.visible').type(last)
        }

        if (first && last) {
            cy.get('.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input')
            .invoke('val')
            .then((employeeId) => {
              // Check if warning of the Employee Id already exists
              cy.get('.oxd-grid-2 > .oxd-grid-item')
                .then(($el) => {
                  const text = $el.text().trim()
                  if (text.includes('Employee Id already exists')) {
                    const newId = `EMP${Date.now()}`
                    cy.get('.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input')
                      .clear()
                      .type(newId)
                    cy.wrap(newId).as('employeeId')
                  } else {
                    // No error, proceed with the existing one
                    cy.wrap(employeeId).as('employeeId')
                  }
                })
            })
        }
    }
  
    saveEmployee(first, last) {
        cy.get('.oxd-button--secondary').should('be.visible').click()

        if (first && last) {
            cy.get('.oxd-toast').should('contain', 'Successfully Saved')
            cy.wait(2000)
        }
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
        cy.get('.oxd-toast').should('contain', 'Successfully Updated')
        cy.wait(2000)
    }
  
    assignSupervisor(method) {
        cy.get(':nth-child(8) > .orangehrm-tabs-item').should('be.visible').click()
        cy.get(':nth-child(2) > :nth-child(1) > .orangehrm-action-header > .oxd-button').should('be.visible').click()
        cy.get('.oxd-autocomplete-text-input > input').type('a')
        cy.wait(2000)
        cy.get('.oxd-autocomplete-option').first().click()
        .invoke('val')
        .then((assignedSupervisor) => {
            cy.wrap(assignedSupervisor).as('assignedSupervisor')
        })
    
        cy.get('.oxd-select-text').should('be.visible').click()
        cy.contains('.oxd-select-option', method).click()
    
        cy.get('.oxd-button--secondary').should('be.visible').click()
        cy.get('.oxd-toast').should('contain', 'Successfully Saved')
        cy.wait(2000)
    }
  
    searchEmployee(firstAndMiddleName, lastName) {
        cy.get(':nth-child(2) > .oxd-main-menu-item').should('be.visible').click()
        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper input').should('be.visible').type(firstAndMiddleName + ' ' + lastName)
        cy.get('@employeeId').then((id) => {
            cy.get(':nth-child(2) > .oxd-input').should('be.visible').type(id)
        })
        cy.get('.oxd-form-actions > .oxd-button--secondary').should('be.visible').click()
    }
  
    verifyEmployeeExists(firstAndMiddleName, lastName, jobTitle, employmentStatus, subunit) {
        cy.get('@employeeId').then((id) => {
            cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row > :nth-child(2)').should('contain', id)
        })
        cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row > :nth-child(3)').should('contain', firstAndMiddleName)
        cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row > :nth-child(4)').should('contain', lastName)
        cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row > :nth-child(5)').should('contain', jobTitle)
        cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row > :nth-child(6)').should('contain', employmentStatus)
        cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row > :nth-child(7)').should('contain', subunit)
        cy.get('@assignedSupervisor').then((supervisor) => {
            cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row > :nth-child(8)').should('contain', supervisor)
        })
    }
}
  
export default PimPage
  