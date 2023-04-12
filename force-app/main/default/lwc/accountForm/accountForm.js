import { LightningElement, api, wire } from 'lwc';

import Account from '@salesforce/schema/Account';
import Industry from '@salesforce/schema/Account.Industry';
import Type from '@salesforce/schema/Account.Type';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
export default class AccountForm extends LightningElement {

    
    @api account = {
        Name: '',
        Type: '',
        Industry: ''
    }
    picklist;
    get accountIndustry() {
        if (this.picklist)
            return this.picklist['picklistFieldValues'][Industry.fieldApiName].values;
        else
            return null;
    }
    get accountType() {
        if (this.picklist)
            return this.picklist['picklistFieldValues'][Type.fieldApiName].values;
        else
            return null;
    }
    @wire(getPicklistValuesByRecordType, {
        objectApiName: Account,
        recordTypeId: '012000000000000AAA'
    })
    wiredValue({ error, data }) {
        if (data) {
            this.picklist = data;
        } else {
            console.log('Schema Error', error);

        }
    }
    handleName(event) {
        this.account.Name = event.detail.value;
    }
    hanldeType(event) {
        this.account.Type = event.detail.value;
    } 
    handleIndustry(event) {
        this.account.Industry = event.detail.value;
    }
    
}