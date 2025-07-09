Feature: SauceDemo Login

  Scenario Outline: Login with various credentials
    Given I open the SauceDemo login page
    When I fill in username "<username>" and password "<password>"
    And I click the login button
    Then I should see the login <outcome>

    Examples:
      | username        | password     | outcome |
      | standard_user   | secret_sauce | success |
      | locked_out_user | secret_sauce | failure |
      | invalid_user    | wrong_pass   | failure |