public with sharing class AccountRelatedListController {
    @AuraEnabled(cacheable=true)
       public static List<Contact> getContacts(String accountId, String[] fieldNames, String orderBy) {
           // Get the contacts related to the account based on account ID
           List<Contact> contacts = [SELECT Id, AccountId, FirstName, LastName, Email, Phone FROM Contact WHERE AccountId = :accountId];
           return contacts;
       }
       
       @AuraEnabled
       public static void createContact(Map<String, Object> contactData) {
           // Create a new contact
           Contact newContact = new Contact();
           newContact.AccountId = (Id)contactData.get('AccountId');
           newContact.FirstName = (String)contactData.get('FirstName');
           newContact.LastName = (String)contactData.get('LastName');
           newContact.Email = (String)contactData.get('Email');
           newContact.Phone = (String)contactData.get('Phone');
           insert newContact;
       }
       
       @AuraEnabled
       public static void updateContact(Map<String, Object> contactData) {
           // Update an existing contact
           Contact updatedContact = new Contact();
           updatedContact.Id = (Id)contactData.get('Id');
           updatedContact.FirstName = (String)contactData.get('FirstName');
           updatedContact.LastName = (String)contactData.get('LastName');
           updatedContact.Email = (String)contactData.get('Email');
           updatedContact.Phone = (String)contactData.get('Phone');
           update updatedContact;
       }
       
       @AuraEnabled
       public static void deleteContact(String contactId) {
           // Delete an existing contact
           Contact contactToDelete = new Contact();
           contactToDelete.Id = (Id)contactId;
           delete contactToDelete;
       }
   }