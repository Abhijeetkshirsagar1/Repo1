import { createElement } from 'lwc';
import AccountForm from 'c/accountForm';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

async function flushPromises() {
    return Promise.resolve();
  }
const mockPicklistValues=require('./data/mockPicklistValues.json');
describe('c-account-form', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
      
    beforeEach(() => {
        const element = createElement("c-account-form", {
          is: AccountForm
        });
        document.body.appendChild(element);
      });

    it('Test All Input', async () => {
        
        const element = document.body.querySelector("c-account-form");
        const input = element.shadowRoot.querySelector("lightning-input");
        // Account Name
        input.value = "Asif Jamal";
        input.dispatchEvent(
          new CustomEvent("change", {
            detail: { value: input.value }
          })
        );

        // Account Type and Industry
        const comboboxs =element.shadowRoot.querySelectorAll('lightning-combobox');
        comboboxs[0].value = "Prospect";
        comboboxs[0].dispatchEvent(
            new CustomEvent("change", {
              detail: { value: comboboxs[0].value }}
              ))  
        comboboxs[1].value = "Apparel";
        comboboxs[1].dispatchEvent(
            new CustomEvent("change", {
              detail: { value: comboboxs[1].value }}
              ))
       
        await flushPromises();
        expect(element.account.Name).toBe("Asif Jamal");
        expect(element.account.Type).toBe("Prospect");
        expect(element.account.Industry).toBe("Apparel");
    });

    it('wired method picklist mocking',()=>{
      const element = document.body.querySelector("c-account-form");
      getPicklistValues.emit(mockPicklistValues);
      expect(element).toBeDefined();
  })
});
