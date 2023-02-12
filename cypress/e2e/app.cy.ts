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

describe("Contacts", () => {
  it("should open a contact's details", () => {
    mockContactsList();

    cy.visit("http://localhost:3000/");

    cy.get("h4").contains("Roosevelt Green").click();

    cy.get("p").contains("Phone: 434343434");
    cy.get("p").contains("Email: Tyshawn_Bahringer89@yahoo.com");
    cy.get("p").contains("Birthday: 44/44/4444");
    cy.get("p").contains("Created at: Thu Feb 02 2023");
  });

  it("should edit a contact's details", () => {
    mockContactsList();
    mockContactUpdate();

    cy.visit("http://localhost:3000/");

    cy.get("h4").contains("Roosevelt Green").click();
    cy.get("button").contains("Edit").click();

    cy.get("input[name='name']").clear().type(mockContact.name);
    cy.get("button").contains("Save").click();

    cy.get("h4").contains(mockContact.name);
  });
});

export {};
