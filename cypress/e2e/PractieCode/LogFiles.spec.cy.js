describe.only("In what order are these messages printed?", () => {
    it("I would expect the LOG to be printed before the EXPECT", () => {
      Cypress.log("Hello from cy.log");
      expect(1 + 1).to.equal(2);
      Cypress.Commands.add('clickconolioMenu',()=>{
        cypress.
      })
    });
  });