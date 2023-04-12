public with sharing class CreateAccountAss {

    @AuraEnabled(cacheable=true)
    public static list<Account> latestAccount()
    {
        list<account> acclist=[select  Name,Type, Industry,LastModifiedDate  from Account limit 10];
        return acclist;
    }

}