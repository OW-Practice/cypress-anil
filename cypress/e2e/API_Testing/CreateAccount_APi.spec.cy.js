
const data = require("../../fixtures/API_Test_Data/apidata.json")

describe('API Testing with Payload in Cypress', () => {

   var token 
   var accoutToken
    it('should make a POST request with payload', () => {
      
      cy.request({
        
        method: 'POST',
        url: data.url,

        body: {
          'username' :  data.username,
          'password':   data.password,
          'grant_type':  'password'
        },

        failOnStatusCode: false,

        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', 
        },

      }).then((response) => {
        
        expect(response.status).to.eq(200);
        token = response.body.access_token
        cy.log(token)
      
        
      });
    });

   it('create account',()=>{
   
     cy.log(token)

    cy.request({
      method: "POST",

      failOnStatusCode: false,

      url : data.url,

      body:{
       
       'fileAs' : data.fileAs,
       'folioNumber': data.folioNumber,
       'name' : data.name,
       'primaryContactId' : null,
       'subType' : data.subType

       },

       headers:{
        'Content-Type' :  'application/json',
        'Authorization' : 'bearer '+token
       }
       
    }).then((response)=>{
      accoutToken = response.body
      expect(response.status).to.eq(200)
    })
  })

    it('delete Account',()=>{
    
      cy.request({

         method : 'DELETE',
         url : data.url+""+accoutToken,
         
         headers:{
          'Content-Type' :  'application/json',
          'Authorization' : 'bearer '+token
         }

      }).then((response)=>{
        expect(response.status).to.eq(200);
        

      })

  

   }) 


   


  });