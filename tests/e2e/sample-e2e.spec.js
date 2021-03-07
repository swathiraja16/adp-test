describe("My First Test", () => {
    it("Does not do much!", () => {
      expect(true).to.equal(true);
    });

    it('Visits the home page', () => {
        cy.visit('http://localhost:9000')
      })
  });
  