import {  api, wire } from 'lwc';

import LightningModal from 'lightning/modal';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ChildModel extends LightningModal {
    @api accId

    handleClose(){
        console.log('cancel called')
     this.close();
     }

     handleUpdate()
     {
        const event = new ShowToastEvent({
            title: 'Account Updated !!!',
            message:'',
            variant:'Success'
        });
        this.dispatchEvent(event);
        this.close();
     }
}