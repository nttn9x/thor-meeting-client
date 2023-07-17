const username = "Jimmy";

describe("Welcome Page", () => {
  it("Input name", () => {
    cy.get('[data-testid="name-input"]').type(username);
  });

  it("Starting video call", () => {
    cy.get('[data-testid="video-label"]').click();
    cy.get('[data-testid="let-talk-button"]').click();
    cy.location("href").should("include", `${Cypress.env().baseUrl}/room`);
    cy.get('[data-testid="current-user-name"]').contains(username);
  });
});
