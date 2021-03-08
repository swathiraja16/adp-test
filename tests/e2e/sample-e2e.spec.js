describe("My First Test", () => {
    it("Does not do much!", () => {
      expect(true).to.equal(true);
    });

    it('Visits the home page', () => {
        cy.visit('http://localhost:9000')
      })

    it('button click', () => {
      cy.get('#startTask').click()
    })

    it('button click', () => {
      cy.get('#endTask').click()
    })

    it('check document', () => {
      cy.document()
    })

    it('button hover', () => {
      cy.get('#startTask').trigger('mouseover')
    })
    

    it('get method', () => {
      cy.intercept('GET', '/get-task', {
        statusCode: 200,
        body: 'it worked!'
      })
    })

    // it('post method', () => {
    //   cy.request('POST', '/submit-task', {
    //     'id':'17d80ba5-cace-44da-8f0d-ba20ecb145d4',
    //     'result': 4975671346527996
    //   })
    //   .then((response) => {
    //     // response.body is automatically serialized into JSON
    //     expect(response.body).to.have.property('Correct') // true
    //   })
    // })
  });
  