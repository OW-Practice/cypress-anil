
const data = require("../../fixtures/API_Test_Data/apidata.json")
describe('Api testing with cypress',()=>{

    it('login with finfolio',()=>{

        const payload ={
            username : data.username,
            password: data.password,
            
        }

        cy.request({
           method : 'POST',
           url : data.url,

           body :{
            'username' : data.username,
            'password': data.password,
           },

           headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            
          },

           
        }).then((Response)=>{
            //expect(Response.status).to.eq(200)
        })

        

    })

})