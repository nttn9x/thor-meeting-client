import { v4 as uuidv4 } from "uuid";

const HOST = Cypress.env().baseUrl!;

describe("Lobby Page", () => {
  const code = uuidv4();

  it("Access page", () => {
    cy.visit(HOST);
  });

  it("Joining meeting with auto generate code", () => {
    cy.get('[data-testid="new-meeting-button"]').click();
    cy.location("href").should("include", `${HOST}/name`);
  });

  it("Joining meeting with fix code", () => {
    cy.go("back");
    cy.get('[data-testid="code-input"]').type(code);
    cy.get('[data-testid="join-button"]').click();
    cy.location("href").should("eq", `${HOST}/name/${code}`);
  });
});
