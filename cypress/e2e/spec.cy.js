describe('empty spec', () => {

  it('Should see the elements of the page', () => {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      statusCode: 200,
	    body: {
        urls: [  
          {
            id: 1,
            long_url: 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
            short_url: 'http://localhost:3001/useshorturl/1',
            title: 'Awesome photo'
          }
        ]
      }
    }).as('getUrls')
      .visit('http://localhost:3000')
    cy.get("h1").contains("URL Shortener")
    cy.get("form")
    cy.get('input[name="title"]')
    cy.get('input[name="urlToShorten"]')
    cy.get('button').contains("Shorten Please!")
    cy.get('.url').contains('h3', 'Awesome photo')
    cy.get('.url').contains('a', 'http://localhost:3001/useshorturl/1')
    cy.get('.url').contains('p', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })

  it('Should be able to use the form', () => {
    cy.intercept('Post', 'http://localhost:3001/api/v1/urls', {
        status: 201,
        body: {
          long_url: "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80", 
          title: "AAA"
        }
    }).as("postUrls")
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      statusCode: 200,
      body: {
        urls: [  
          {
            id: 1,
            long_url: 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
            short_url: 'http://localhost:3001/useshorturl/1',
            title: 'Awesome photo'
          },
          {
            id: 2,
            long_url: 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
            short_url: 'http://localhost:3001/useshorturl/2',
            title: 'AAA'
          }
        ]
      }
    }).as('getUrls')
    cy.get("form")
    cy.get('input[name="title"]').type("AAA")
      .get('input[name="title"]').should('have.value', "AAA")
    cy.get('input[name="urlToShorten"]').type("https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80")
      .get('input[name="urlToShorten"]').should('have.value', "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80")
    cy.get('button').contains("Shorten Please!").click()
    cy.get('.url').eq(1).contains('h3', 'AAA')
    cy.get('.url').eq(1).contains('a', 'http://localhost:3001/useshorturl/2')
    cy.get('.url').eq(1).contains('p', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })

})