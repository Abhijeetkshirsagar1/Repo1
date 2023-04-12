import { LightningElement, wire, api, track } from 'lwc';

import getAccountList from '@salesforce/apex/AccountHelper.getAccountList';
import saveAccount from '@salesforce/apex/AccountHelper.saveAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class assignment2 extends LightningElement {

    @api acData;
    @track columns = [{
        label: 'Account name',
        fieldName: 'Name',
        type: 'text',
        sortable: true
    },
    {
        label: 'Type',
        fieldName: 'Type',
        type: 'text',
        sortable: true
    },
    {
        label: 'Industry',
        fieldName: 'Industry',
        type: 'test',
        sortable: true
    }
    ];


    handleSave() {
        const accountData = this.template.querySelector('c-account-form').account;
        saveAccount({ jsonData: JSON.stringify(accountData) })
            .then(result => {
                const event1 = new ShowToastEvent({
                    title: 'Success!',
                    message: result,
                    variant:'Success',
                    messageData: [
                        'Salesforce',
                        {
                            url: 'http://www.salesforce.com/',
                            label: 'here',
                        },
                    ],
                });
                this.dispatchEvent(event1);
            })
            .catch(error => {
                console.log('apex eeror', error);
            });
    }
    @track accountList;
    handleGetAccounts() {
        getAccountList()
            .then(result => {
                console.log(JSON.stringify(result));
                this.accountList = result;
                const event1 = new ShowToastEvent({
                    title: 'Success!',
                    message: 'Accounts Fetched',
                    variant:'Success',
                    messageData: [
                        'Salesforce',
                        {
                            url: 'http://www.salesforce.com/',
                            label: 'here',
                        },
                    ],
                });
                this.dispatchEvent(event1);
            })
            .catch(error => {
                console.log('apex eeror', error);
            });
    }
}