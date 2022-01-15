public with sharing class ContactControler {
    @AuraEnabled(cacheable=true)

public static List<Contact> getContactList(){
    return [SELECT Id,title, Name,Email FROM Contact];

}
}
