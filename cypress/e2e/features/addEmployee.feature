Feature: Add New Employee in OrangeHRM

  Scenario Outline: Add a new employee with job and supervisor details
    Given user is logged in as admin
    And user navigates to the PIM module
    When user adds a new employee with first name "<firstName>", middle name "<middleName>", last name "<lastName>"
    And user fills job details with joining date "<joiningDate>", job title "<jobTitle>", job category "<jobCategory>", subunit "<subunit>", employment status "<employmentStatus>"
    And user assigns a supervisor with the reporting method of "<reportingMethod>"
    Then the employee "<firstName> <middleName> <lastName>" should be added successfully

    Examples:
      | firstName | middleName | lastName | joiningDate | jobTitle          | jobCategory   | subunit           | employmentStatus    | reportingMethod |
      | Bryan     | V.         | Vernanda | 2025-10-07  | Automation Tester | Automation QA | Quality Assurance | Full-Time Permanent | Direct          |


