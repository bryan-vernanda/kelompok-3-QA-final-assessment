Feature: Add Multiple Admin Functionality

  Scenario Outline: Add new admin user
    Given user is logged in as standard admin user
    And user navigates to Admin page
    When user adds a new admin with username "<newUsername>", password "<password>", role "<role>", status "<status>", and associated employee "<employee>"
    Then the admin "<newUsername>" with its unique username should appear in the user list with details including the user role "<role>", employee name "<employee>", and status "<status>"

    Examples:
      | newUsername  | password        | employee          | role  | status   |
      | cypressuser1 | cypressuser321  | Bryan V. Vernanda | Admin | Enabled  |
      | cypressuser2 | Cyp12essus3r123 | Nathanael Lukas   | ESS   | Disabled |

  Scenario Outline: Fail to add new admin due to invalid password
    Given user is logged in as standard admin user
    And user navigates to Admin page
    When user adds a new admin with username "<newUsername>", password "<password>", role "<role>", status "<status>", and associated employee "<employee>"
    Then the system should show password error validation message "<outcome>"

    Examples:
      | newUsername  | password | employee          | role  | status   | outcome                                                |
      | invalidUser1 | ABCdefg  | Bryan V. Vernanda | Admin | Enabled  | Your password must contain minimum 1 number            |
      | invalidUser2 | Ab12     | Nathanael Lukas   | ESS   | Disabled | Should have at least 7 characters                      |
      | invalidUser3 | ABCD1234 | John Duncan Doe   | Admin | Enabled  | Your password must contain minimum 1 lower-case letter |
