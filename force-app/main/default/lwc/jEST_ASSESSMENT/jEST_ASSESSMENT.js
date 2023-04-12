import { LightningElement ,wire } from 'lwc';
import AccountName from '@salesforce/apex/CreateAccountAss.latestAccount';
import child1 from 'c/child1';

const columns = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Account type', fieldName: 'Type' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Last Modified Date', fieldName: 'LastModifiedDate' }
   
];
export default class JEST_ASSESSMENT extends LightningElement {

    names=[];
    value;
    columns=columns;
    accRecords=[];
    accData;
 
   
   @wire(AccountName)
   accountData({error,data})
   {
    if (data) {
         console.log('data-->',data);
         this.accData=data;
         for(let i=0; i<data.length; i++) {
            console.log('id=' + data[i].Id);
            this.names = [...this.names ,{value: data[i].Id , label: data[i].Name}];                                   
        }

                console.log(this.names);
     } 
    else if (error) {
        this.error = error;
       // this.record = undefined;
    }
  }


  handleChange(event)
  {
    this.value=event.detail.value;
    console.log('value-->',this.value);
  }

  handleDisplay(){
    this.accRecords=this.accData;
  }

  handleEditClick()
  {
    child1.open({ accId: this.value })
  }
     
}