import HomePageLoc  from "../locators/HomePageLocaters";

export default class HomePage{
    
    verifyThatprofilePictureIsDisplayed(){
        cy.get(HomePageLoc.leftSidemenu).should('be.visible')
    }
    verifyThatLeftSideMenuIsDisplayed(){
       cy.get(HomePageLoc.profilePicuture).should('be.visible') 
    }
    
}