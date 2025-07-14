Feature: OrangeHRM Login Feature

  Scenario Outline: User logs in with valid and invalid credentials
    Given user is on the login page
    When user logs in using username "<username>" and password "<password>"
    Then user should see the <outcome>

    Examples:
      | username | password | outcome        |
      | Admin    | admin123 | dashboard page |
      | Admin    | Error    | error messages |
      | Error    | admin123 | error messages |