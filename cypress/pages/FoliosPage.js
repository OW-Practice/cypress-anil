
import FoliosPage from '../locators/Folios'

export  default class  FoliosPages {

   clickonFoliosMenu(){
    cy.get(FoliosPage.foliosMenu).click()
   }
   clickOnFoliosViewDropdown(){
    cy.get(FoliosPage.foliosDropdown).click()
    cy.get(FoliosPage.allFoliosView).click()
   }
   clickOnPlusIcon(){
    cy.get(FoliosPage.PlusIcon).click()
   }
   clickOnAccountOption(){
    cy.get(FoliosPage.accountsOption).click()
   }
   verifyThatAccoutCreationFormDisplayed(){
    cy.get(FoliosPage.createAccountModel).should('be.visible')
   }
   enterAccountName(name){
    cy.get(FoliosPage.fileAsInputfiled).type(name)
    
   }
   enterAccountNumber(number){
    cy.get(FoliosPage.accountNumberInputFiled).type(number)
   }
   clickOnOkButton(){
    cy.get(FoliosPage.okButton).click()
   }

}
