Feature: OrangeHRM Claim Feature

  Scenario Outline: Submit a new claim with expense details
    Given user is logged in as admin
    And user navigates to the Claim page
    When user assigns a new claim for "<employee>" with event "<event>", currency "<currency>", and the description "<description>"
    And user adds an expense of type "<expense>" on "<date>" with amount "<amount>"
    And user submits the claim request
    Then a claim request for "<employee>" should be successfully created with a unique Reference ID and the details including event name "<event>", description "<description>", currency "<currency>", amount "<amount>", the submitted date, and its status

    Examples:
      | employee          | event                 | currency          | description                  | expense       | date       | amount  |
      | Bryan V. Vernanda | Travel Allowance      | Singapore Dollar  | Claim for traveling          | Transport     | 2025-29-12 | 400.00  |
      | Nathanael Lukas   | Medical Reimbursement | Indonesian Rupiah | Claim for an eye examination | Accommodation | 2025-17-08 | 3000000 |
    
  Scenario Outline: Fail to add a claim expense due to incorrect data in required fields
    Given user is logged in as admin
    And user navigates to the Claim page
    When user assigns a new claim for "<employee>" with event "<event>", currency "<currency>", and the description "<description>"
    And user adds an expense of type "<expense>" on "<date>" with amount "<amount>"
    Then an error message "<outcome>" should appear, preventing the claim expense to be added

    Examples:
      | employee          | event                 | currency          | description                        | expense         | date       | amount       | outcome                                       |
      | Bryan V. Vernanda | Travel Allowance      | Singapore Dollar  | Claim for traveling                |                 | 2025-29-12 | 400.00       | Expense Type is required                      |
      | Nathanael Lukas   | Medical Reimbursement | Indonesian Rupiah | Claim for an eye examination       | Accommodation   | 20251708   | 3000000      | Should be a valid date in yyyy-dd-mm format   |
      | John Duncan Doe   | Medical Reimbursement | Myanmar Kyat      | Claim for one week hospitalization | Planned Surgery | 2025-21-09 | 5,000,000.00 | Should be a valid number (xxx.xx)             |
