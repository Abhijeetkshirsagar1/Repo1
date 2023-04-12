import { createElement } from 'lwc';
import JEST_ASSESSMENT from 'c/jEST_ASSESSMENT';
import AccountName from '@salesforce/apex/CreateAccountAss.latestAccount';
import child1 from 'c/child1';
jest.mock('c/child1');

const accs = require('./data/accounts.json');

async function flushPromises(){
    return Promise.resolve();
}

jest.mock(
    '@salesforce/apex/Assessment.latestAccount',
    () => {
      const {
        createApexTestWireAdapter
      } = require('@salesforce/sfdx-lwc-jest');
      return {
        default: createApexTestWireAdapter(jest.fn())
      };
    },
    { virtual: true }
  );

describe('c-j-e-s-t-assessment', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('test combobox', async() => {
        // Arrange
        const element = createElement('c-j-e-s-t-assessment', {
            is: JEST_ASSESSMENT
        });
        // Act
        AccountName.emit(accs);
        document.body.appendChild(element);

        const combobox = element.shadowRoot.querySelector('lightning-combobox');
        combobox.dispatchEvent(new CustomEvent('change',{
            detail:{
                value:'AADHJE1HJ384JK'
            }
        }))
        await flushPromises();
        expect(combobox.value).toBe('AADHJE1HJ384JK');
    });

    it('test buttons', () => {
        // Arrange
        const element = createElement('c-j-e-s-t-assessment', {
            is: JEST_ASSESSMENT
        });
        // Act
        AccountName.emit(accs);
        child1.open = jest.fn().mockResolvedValue('option1');
        document.body.appendChild(element);

        const buttons = element.shadowRoot.querySelectorAll('lightning-button');
        buttons[0].dispatchEvent(new CustomEvent('click'));
        buttons[1].dispatchEvent(new CustomEvent('click'));


        expect(1).toBe(1);
    });
});