import { LightningElement, api, wire } from 'lwc'
import CONTACT_OBJECT from '@salesforce/schema/Contact'

import getRelatedContacts from '@salesforce/apex/RelatedContactsController.getRelatedContacts'

export default class RelatedList extends LightningElement {
    @api recordId
    @api objectApiName = CONTACT_OBJECT
    @api accountId
    firstName
    lastName
    email
    phone
    data = []
    columns = [
      { label: 'Contact Name', fieldName: 'Name', type: 'text' },
      { label: 'Email', fieldName: 'Email', type: 'email' },
      { label: 'Phone', fieldName: 'Phone', type: 'phone' }
    ]

    @wire(getRelatedContacts, { accountId: '$recordId' })
    contacts ({ error, data }) {
      if (data) {
        this.data = data.map(contact => {
          return {
            Id: contact.Id,
            Name: contact.Name,
            Email: contact.Email,
            Phone: contact.Phone
          }
        })
      } else if (error) {
        console.error(error)
      }
    }
}
