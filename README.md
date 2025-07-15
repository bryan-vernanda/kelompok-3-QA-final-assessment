# 💼 Kelompok 3 - QA Final Assessment

**Member Name - NIM:**
- Ananda Wongwatana Nasution - 2502047985
- Bryan Vernanda - 2501960120
- Swasa Raditya Tirta - 2501971282

## 📘 Project Details
![Project Details](https://drive.google.com/uc?export=view&id=1r9VDhVRaT67op5a7ul6cGwmdo7ljkO0h)

## 🧪 Test Environments

- [Login](https://opensource-demo.orangehrmlive.com/)
- [Admin Menu](https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers)
- [PIM Menu](https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList)
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
**(will be added)**

## 🖥️ Test Execution via Cypress GUI
**(will be added)**

## 🧩 Summary

This project leverages the **BDD approach** with **Gherkin/Cucumber** to promote collaboration and clarity in test automation.  
By combining **feature files**, the **POM pattern**, and **step definitions**, this structure allows for:

- High reusability
- Easy maintenance
- Scalable test development

The separation of concerns ensures that UI changes, test logic, and scenario descriptions remain independent, improving overall readability and flexibility of the codebase.

## 🔍 Key Findings

**(will be added)**
