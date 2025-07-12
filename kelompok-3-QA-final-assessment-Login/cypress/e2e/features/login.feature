Feature: Login to OrangeHRM

  Scenario: Successful Login
    Given user is on the login page
    When user logs in using username "<username>" and password "<password>"
    Then user should see the dashboard page

    Examples:
      | username | password  |
      | Admin    | admin123  |

  Scenario: Failed Login 
    Given user is on the login page
    When user logs in using invalid credentials
    Then user should see an error message