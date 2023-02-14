//@ts-ignore
import * as mockContact from "../fixtures/contact.json";

function mockContactsList() {
  cy.intercept("GET", "/api/contacts", { fixture: "contacts.json" }).as(
    "getData"
  );
}

function mockContactUpdate() {
  cy.intercept("PUT", "/api/contacts*", { fixture: "contact.json" }).as(
    "getData"
  );
}

function mockContactDelete() {
  cy.intercept("DELETE", "/api/contacts*", { fixture: "contacts.json" }).as(
    "getData"
  );
}

const goToHomePage = () => cy.visit("http://localhost:3000/");

describe("Contacts", () => {
  it("should open a contact's details", () => {
    mockContactsList();

    goToHomePage();

    cy.get("h4").contains("Roosevelt Green").click();

    cy.get("p").contains("Phone: 434343434");
    cy.get("p").contains("Email: Tyshawn_Bahringer89@yahoo.com");
    cy.get("p").contains("Birthday: 2023-02-14");
    cy.get("p").contains("Created at: Thu Feb 02 2023");
  });

  it("should edit a contact's details", () => {
    mockContactsList();
    mockContactUpdate();

    goToHomePage();

    cy.get("h4").contains("Roosevelt Green").click();
    cy.get("button").contains("Edit").click();

    cy.get("input[name='name']").clear().type(mockContact.name);
    cy.get("button").contains("Save").click();

    cy.get("h4").contains(mockContact.name);
  });

  it("should delete a contact", () => {
    mockContactsList();
    mockContactDelete();

    goToHomePage();

    cy.get("h4").contains("Roosevelt Green").click();
    cy.get("button").contains("Delete").click();

    cy.get("h4").contains("Roosevelt Green").should("not.exist");
  });
});

export {};
