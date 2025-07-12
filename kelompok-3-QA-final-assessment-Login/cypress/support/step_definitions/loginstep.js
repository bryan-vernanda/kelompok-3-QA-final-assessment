import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import LoginPage from '../../pages/loginpage'

Given("user is on the login page", () => {
  LoginPage.visit();
});

When("user logs in using username {string} and password {string}", (username, password) => {
  LoginPage.enterUsername(username);
  LoginPage.enterPassword(password);
  LoginPage.clickLogin();
});

Then("user should see the dashboard page", () => {
  cy.url().should("include", "/dashboard");
});

When("user logs in using invalid credentials", () => {
  LoginPage.enterUsername("invalid");
  LoginPage.enterPassword("invalid");
  LoginPage.clickLogin();
});

Then("user should see an error message", () => {
  LoginPage.checkErrorMessage();
});