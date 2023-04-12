public with sharing class AccountHelper {
    
    @AuraEnabled
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Type, Industry
            FROM Account order by createdDate Limit 10] ;
    }
    @AuraEnabled
    public static string saveAccount(String jsonData){
        try {
            Account newAccount = (Account)JSON.deserialize(jsonData, Account.class);
            Insert  newAccount;
            return newAccount.Name +' Account Successfully Created';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}