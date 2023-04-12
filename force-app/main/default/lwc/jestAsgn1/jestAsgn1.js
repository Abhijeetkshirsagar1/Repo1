import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class JestAsgn1 extends LightningElement {
  @track email = '';
  @track password = '';
  @track errorMessage = '';
  @track successMessage = '';
  @track errorMessageClass = 'slds-hide';
  @track successMessageClass = 'slds-hide';

  handleEmailChange(event) {
    this.email = event.target.value;
  }

  handlePasswordChange(event) {
    this.password = event.target.value;
  }

  handleForgotPasswordClick() {
    if (this.password) {
    this.successMessage = 'Password reset successfully';
    this.successMessageClass = 'slds-show';
    this.errorMessageClass = 'slds-hide';
  } else {
    this.errorMessage = 'Error: Password not entered';
      this.errorMessageClass = 'slds-show';
      this.successMessageClass = 'slds-hide';
    }
  }

  handleLoginClick() {
    if (!this.password) {
      this.errorMessage = 'Error: Password not entered';
      this.errorMessageClass = 'slds-show';
      this.successMessageClass = 'slds-hide';
    } else {
      this.successMessage = `Logged in as ${this.email}`;
      this.successMessageClass = 'slds-show';
      this.errorMessageClass = 'slds-hide';
    }
  }
}
