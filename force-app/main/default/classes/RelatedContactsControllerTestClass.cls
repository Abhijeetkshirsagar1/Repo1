public with sharing class RelatedContactsControllerTestClass {
    @isTest
    Public static void testGetRelatedContacts() {
        Account acc = new Account(Name='Test Account');
        insert acc;
        Contact c1 = new Contact(FirstName='Test', LastName='Contact1', Email='test1@test.com', Phone='555-1234', AccountId=acc.Id);
        Contact c2 = new Contact(FirstName='Test', LastName='Contact2', Email='test2@test.com', Phone='555-5678', AccountId=acc.Id);
        insert new List<Contact>{c1, c2};
        
        Test.startTest();
        List<Contact> contacts = RelatedContactsController.getRelatedContacts(acc.Id);
        Test.stopTest();
        
        System.assertEquals(2, contacts.size());
        System.assertEquals('Test Contact1', contacts[0].Name);
        System.assertEquals('Test Contact2', contacts[1].Name);
    }
    
    @isTest
    Public static void testDeleteRecord() {
        Account acc = new Account(Name='Test Account');
        insert acc;
        Contact c1 = new Contact(FirstName='Test', LastName='Contact1', Email='test1@test.com', Phone='555-1234', AccountId=acc.Id);
        insert c1;
        
        Test.startTest();
        RelatedContactsController.deleteRecord(c1.Id);
        Test.stopTest();
        
        Contact deletedRecord = [SELECT Id, IsDeleted FROM Contact WHERE Id = :c1.Id];
        System.assertEquals(true, deletedRecord.IsDeleted);
    }
    
    @isTest
    Public static void testCreateRecord() {
        Account acc = new Account(Name='Test Account');
        insert acc;
        
        Test.startTest();
        RelatedContactsController.createRecord(acc.Id, 'New Test Contact');
        Test.stopTest();
        
        List<Contact> contacts = [SELECT Id, LastName, AccountId FROM Contact WHERE AccountId = :acc.Id];
        System.assertEquals(1, contacts.size());
        System.assertEquals('New Test Contact', contacts[0].LastName);
    }
    
    @isTest
    Public static void testUpdateRecord() {
        Account acc = new Account(Name='Test Account');
        insert acc;
        Contact c1 = new Contact(FirstName='Test', LastName='Contact1', Email='test1@test.com', Phone='555-1234', AccountId=acc.Id);
        insert c1;
        
        Test.startTest();
        RelatedContactsController.updateRecord(c1.Id, 'Updated Test Contact');
        Test.stopTest();
        
        Contact updatedRecord = [SELECT Id, LastName FROM Contact WHERE Id = :c1.Id];
        System.assertEquals('Updated Test Contact', updatedRecord.LastName);
    }
}