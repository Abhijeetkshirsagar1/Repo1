import { createElement } from 'lwc';
import assignment2 from 'c/assignment2';
import saveAccount from '@salesforce/apex/AccountHelper.saveAccount';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import getAccountList from '@salesforce/apex/AccountHelper.getAccountList';
import {ShowToastEventName} from 'lightning/platformShowToastEvent';

const mockPicklistValues=require('./data/mockPicklistValues.json');
const mockAccountList=require('./data/mockAccountList.json');

async function flushPromises() {
    return Promise.resolve();
  }
  jest.mock(
    '@salesforce/apex/AccountHelper.saveAccount',
    () => {
      return {
        default: jest.fn()
      };
    },
    { virtual: true }
  ); 
 jest.mock(
    '@salesforce/apex/AccountHelper.getAccountList',
    () => {
      return {
        default: jest.fn()
      };
    },
    { virtual: true }
  );
const mockCreateAccount = require('./data/mockCreateAccount.txt');
describe('c-assignment2', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
      
    beforeEach(() => {
        const element = createElement("c-jest-assignment2", {
          is: assignment2
        });
        document.body.appendChild(element);
      });

    it('Create Account', async () => {
        saveAccount.mockResolvedValue(mockCreateAccount);
        getPicklistValues.emit(mockPicklistValues);
        const parentElement = document.body.querySelector("c-jest-assignment2");
        const childElement = parentElement.shadowRoot.querySelector("c-account-form");
        const input = childElement.shadowRoot.querySelector("lightning-input");
        // Account Name
        input.value = "Asif Jamal";
        input.dispatchEvent(
          new CustomEvent("change", {
            detail: { value: input.value }
          })
        );

        // Account Type and Industry
        const comboboxs = childElement.shadowRoot.querySelectorAll('lightning-combobox');
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
        
        const buttons = parentElement.shadowRoot.querySelectorAll('lightning-button');
        buttons[0].click();   
        
        await flushPromises();       
        expect(parentElement).toBeDefined();
    });
    it('Get Accounts and Through Toast Message', async () => {
        getAccountList.mockResolvedValue(mockAccountList);
       
        const parentElement = document.body.querySelector("c-jest-assignment2");
       
        const handler=jest.fn();
        parentElement.addEventListener('lightning__showtoast',handler);
       
        const buttons = parentElement.shadowRoot.querySelectorAll('lightning-button');
        buttons[1].click();          
        await flushPromises();       
        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.title).toBe('Success!');
        expect(handler.mock.calls[0][0].detail.message).toBe("Accounts Fetched");
        expect(handler.mock.calls[0][0].detail.variant).toBe('Success');
     
    });
});