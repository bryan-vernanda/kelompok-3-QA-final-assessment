# 💼 Kelompok 3 - QA Final Assessment

**Member Name - NIM:**
- Ananda Wongwatana Nasution - 2502047985
- Bryan Vernanda - 2501960120
- Swasa Raditya Tirta - 2501971282

## 📘 Project Details
![Project Details](https://drive.google.com/uc?export=view&id=1r9VDhVRaT67op5a7ul6cGwmdo7ljkO0h)

## 🧪 Test Environments

- [Login](https://opensource-demo.orangehrmlive.com/)
- [PIM Menu](https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList)
- [Admin Menu](https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers)
- [Claim Menu](https://opensource-demo.orangehrmlive.com/web/index.php/claim/viewAssignClaim)

## 🔗 Prerequisites

- Ensure **Node.js** is installed on your local machine.

## 🗂️ Project Structure

To maintain a clean and modular codebase, the project is organized into three main folders:

- **Feature:**  
  Contains test scenarios written in Gherkin/Cucumber format. Gherkin provides a readable syntax that enables collaboration between developers, testers, and stakeholders by describing application behavior in a structured, human-friendly way. Each `.feature` file defines a specific functionality and includes scenarios along with their corresponding steps.

- **Pages:**  
  Implements the Page Object Model (POM) design pattern. Each file represents a page or component of the application and contains element getters and actions. This separation enhances test maintainability, as UI changes can be handled locally within the corresponding page object without affecting the overall test suite.

- **Step Definitions:**  
  This folder contains the implementation of the steps defined in the feature files. These definitions act as the bridge between Gherkin scenarios and Cypress commands. By keeping the step logic separate, the project maintains a clean, scalable, and reusable structure.

## 🚀 Getting Started

1. Clone the repo  
   `https://github.com/bryan-vernanda/kelompok-3-QA-final-assessment.git`

2. Open your IDE and terminal  
   Navigate to the project directory using:  
   `cd kelompok-3-QA-final-assessment`
   
3. Install dependencies  
   `npm install`

4. Run the tests:
   - **Headless mode** (runs in terminal):  
     `npx cypress run`
   - **GUI mode** (interactive Cypress Test Runner):  
     `npx cypress open`  
     Then:
     - Wait for the Cypress window to appear  
     - Click on a `.feature` file to run the test

5. View the test report  
   After running in headless mode, a test report is generated automatically in the `mochawesome-report` folder.  
   Open the `index.html` file in your browser.

   💡 **Tip:**  
   - On **Mac**: Right-click → "Reveal in Finder"  
   - On **Windows**: Right-click → "Show in File Explorer"

## 📊 Test Report (Headless Mode)
![Headless - Login Feature Test Report](https://drive.google.com/uc?export=view&id=1yRx0oSeMrXqFmGwYtrtoRXAK0iupcpmd)
![Headless - PIM Menu Feature Test Report](https://drive.google.com/uc?export=view&id=1AIjA4iVn8g91--7j5zLrYXPvOEz8SRbW)
![Headless - Admin Menu Feature Test Report](https://drive.google.com/uc?export=view&id=1mb-jYGSGAVwoXfcCbVDRQcrL7zpwKX2r)
![Headless - Claim Menu Feature Test Report](https://drive.google.com/uc?export=view&id=1_it11r5c-V5zLwry1YoaNXF3YeNFHHqE)

## 🖥️ Test Execution via Cypress GUI
![GUI - Login Feature Test Report](https://drive.google.com/uc?export=view&id=1XwWe1zi54Lai2NghpTIPiSaddONXc7Lm)
![GUI - PIM Menu Feature Test Report](https://drive.google.com/uc?export=view&id=1v3lgaDa0wH7CjGkFeHbSKGxvh_dNG1Rd)
![GUI - Admin Menu Feature Test Report](https://drive.google.com/uc?export=view&id=1-0PyBiEIbtjNEkiCEgHXmy7VpSayekzy)
![GUI - Claim Menu Feature Test Report](https://drive.google.com/uc?export=view&id=1c5Uicju_BymaYbjJ0NVeBys8UH1i7paz)

## 🧩 Summary

This project leverages the **BDD approach** with **Gherkin/Cucumber** to promote collaboration and clarity in test automation.  
By combining **feature files**, the **POM pattern**, and **step definitions**, this structure allows for:

- High reusability
- Easy maintenance
- Scalable test development

The separation of concerns ensures that UI changes, test logic, and scenario descriptions remain independent, improving overall readability and flexibility of the codebase.

## 🔍 Key Findings

1. ✅ **Login Feature**  
   The login feature works flawlessly, with no errors or unexpected behavior during test execution for both **positive** and **negative** cases.

2. 🧑‍💼 **PIM Menu Feature**  
   The PIM menu works as expected. It allows users to add a new employee and update their details such as **Job Details**, **Supervisor**, and **Reporting Structure**.  
   However, there is **one caveat**: when creating a new employee, the system auto-generates an **Employee ID**.  
   Occasionally, this ID may already exist if another user created an employee around the same time.  
   When this happens, clicking “Save” will trigger a **duplicate Employee ID** error.  
   To handle this, a function was created to check for the warning and regenerate a new Employee ID if needed.

3. ⚠️ **Admin Menu Feature**  
   Adding a new admin works properly. However, the `username` field must be **unique** on each test run because the data is stored persistently in the backend.  
   - If a custom username is already used, the test will fail.  
   - To handle this, a dynamic username is generated using the current timestamp if necessary:  
     ```js
     const uniqueUsername = `${newUsername}-${Date.now()}`;
     ```
   - Otherwise, the given `newUsername` is used as-is if it hasn’t been used before.

4. 🧾 **Claim Menu Feature**  
   This feature allows employees to submit claims such as **transportation allowance**, **medical reimbursement**, and others.  
   All test cases passed successfully, and no anomalies were found during the testing process.


## ℹ️ Additional Note

All test results above are based on the current state of the application hosted at:  
[https://opensource-demo.orangehrmlive.com/](https://opensource-demo.orangehrmlive.com/)  

Since this is an **open-source demo environment**, the system's data may be **modified or reset without warning** at any time.  
As a result, some inconsistencies such as **missing records**, or **unexpected UI element changes** may occur depending on the exact timing of the test execution.

Therefore, **running the same test more than once** may yield **different results** depending on the current state of the system's data and UI structure at that specific time.
