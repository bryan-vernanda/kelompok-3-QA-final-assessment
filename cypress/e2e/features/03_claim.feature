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
      | Bryan V. Vernanda | Travel Allowance      | Singapore Dollar  | Claim for traveling          | Transport     | 2025-29-12 | 400     |
      | Nathanael Lukas   | Medical Reimbursement | Indonesian Rupiah | Claim for an eye examination | Accommodation | 2025-17-08 | 3000000 |
