Feature: OrangeHRM Claim Feature

  Scenario Outline: Assign claim and add expenses
    Given user is logged in as Admin
    And user navigates to Claim page
    When user clicks on +Assign Claim button
    Then user creates claim request with employee name "<employee>", "<event>" as event, and "<currency>" as the currency
    And user clicks the create button
    Then user clicks on +Add button to assign "<expense>" as expense type, "<date>" as the date, and set the amount of currency as "<amount>"
    And user clicks the Save button
    And user clicks the Submit button to submit the data
    And user press back
    Then claim request of "<employee>" should be created

    Examples:
      | employee  | event            | currency          | expense       | date       | amount  |
      | Bryan     | Travel Allowance | Singapore Dollar  | Transport     | 2025-29-12 | 400     |
      | Nathanael | Accommodation    | Indonesian Rupiah | Accommodation | 2025-08-17 | 3000000 |
