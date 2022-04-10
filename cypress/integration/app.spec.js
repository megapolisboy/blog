describe('Testing whole app workflow', () => {
  it('home page opens correctly', () => {
    cy.visit('http://localhost:3000/');
    cy.contains("Blog");
    cy.contains("React");
    cy.contains("Web Development");
    cy.contains("Blog").click();
  });

  it('categories page opens correctly, comments are left', () => {
    cy.visit('http://localhost:3000/');
    cy.contains("Web Development").click();
    cy.get(".bg-pink-600").should("have.length", 2)
    cy.contains("Continue Reading").click();
    cy.get("textarea").type("This is a test comment")
    cy.get("input:first").type("Grits");
    cy.get("input").eq(1).type("dfndjfn@dfgb.dfg")
    cy.get("input").eq(2).click();
    cy.contains("Post Comment").click();
  })
})