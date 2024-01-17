

describe('network access',()=>{

  const goOffline = () => {
    cy.log('**go offline**')
    .then(() => {
      return Cypress.automation('remote:debugger:protocol',
        {
          command: 'Network.enable',
        })
    })
    .then(() => {
      return Cypress.automation('remote:debugger:protocol',
        {
          command: 'Network.emulateNetworkConditions',
          params: {
            offline: true,
            latency: -1,
            downloadThroughput: -1,
            uploadThroughput: -1,
          },
        })
    })
  }
  const assertOnline = () => {
    return cy.wrap(window).its('navigator.onLine').should('be.true')
  }
  
  const assertOffline = () => {
    return cy.wrap(window).its('navigator.onLine').should('be.false')
  }

  it('shows network status', () => {
  cy.visit('https://qaregression.finfolio.com/')
    cy.wait(5000)
    goOffline()
    assertOffline()

    


    
    })
    
  

})



