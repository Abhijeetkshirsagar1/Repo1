public with sharing class RelatedContactsController {
    
   
   
        @AuraEnabled(cacheable=true)
        public static List<Contact> getRelatedContacts(Id accountId) {
            return [SELECT Id, Name, Email, Phone FROM Contact WHERE AccountId = :accountId];
        }
    
       
        @AuraEnabled
        public static void deleteRecord(Id recordId) {
            delete new Contact(Id=recordId);
        }
       
        @AuraEnabled
        public static void createRecord(Id parentId, String recordName) {
            Contact newRecord = new Contact(
                Lastname = recordName,
                AccountId = parentId
            );
            insert newRecord;
        }
       
        @AuraEnabled
        public static void updateRecord(Id recordId, String recordName) {
            Contact recordToUpdate = new Contact(
                Id = recordId,
                Lastname = recordName
            );
            update recordToUpdate;
        }
    }
    
