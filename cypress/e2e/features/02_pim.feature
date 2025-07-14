Feature: OrangHRM PIM Feature

    Scenario Outline: Add a new employee with its job details
        Given user is logged in as admin
        And user navigates to the PIM module
        When user adds a new employee with first name "<firstName>", middle name "<middleName>", last name "<lastName>"
        And user fills job details with joining date "<joiningDate>", job title "<jobTitle>", job category "<jobCategory>", subunit "<subunit>", employment status "<employmentStatus>"
        And user assigns a supervisor with the reporting method of "<reportingMethod>"
        Then the employee "<firstName> <middleName>" "<lastName>" should be added successfully with a unique Employee ID and the details including job title "<jobTitle>", employment status "<employmentStatus>", subunit "<subunit>", and the assigned supervisor

        Examples:
            | firstName | middleName | lastName | joiningDate | jobTitle                | jobCategory            | subunit           | employmentStatus    | reportingMethod |
            | Bryan     | V.         | Vernanda | 2025-10-07  | IT Manager              | Officials and Managers | Quality Assurance | Full-Time Contract  | Direct          |
            | Nathanael |            | Lukas    | 2025-15-07  | Chief Executive Officer | Professionals          | Finance           | Full-Time Permanent | Indirect        |
            | John      | Duncan     | Doe      | 2025-20-07  | HR Manager              | Officials and Managers | Development       | Full-Time Probation | Direct          |

    Scenario Outline: Fail to add employee due to missing required fields
        Given user is logged in as admin
        And user navigates to the PIM module
        When user adds a new employee with first name "<firstName>", middle name "<middleName>", last name "<lastName>"
        Then the system should display an error saying <outcome>

        Examples:
            | firstName | middleName | lastName | outcome                                    |
            | John      |            |          | "last name cannot be empty"                |
            |           |            | Doe      | "first name cannot be empty"               |
            |           | Duncan     |          | "first name and last name cannot be empty" |