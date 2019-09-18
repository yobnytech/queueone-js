/**
* ======================================================================
* Copyright (C) 2018-2019  Yobny Technology Solutions
* This file is part of QueueOne project.
* ======================================================================
*/

/**
 * Entity holds the account details based on the login details.
 */
class Account {
    /**
     * Initialize the account object with provided account details
     * from the backend. 
     * 
     * @param {object} account
     */
    constructor (account) {
        // account related secret key to execute the api
        this.secretKey = account.secretKey
        // account public key related to account
        this.publicKey = account.publicKey
        // account settings to ensure functionalties enabled for the account
        // TODO: Confirm the Settings related to account when API is executed
        //this.settings = new AccountSettings(account.settings)
        // account associated company
        this.company = account.company
        // account email address which will be executing the api calls.
        this.email = account.email
        // account role in the company
        this.role = account.role
        // confirmation is that sub account or main account
        this.isSubaccount = account.isSubaccount
        // beta features attached to the account
        this.betaFeatures = account.betaFeatures
    }
}

module.exports = Account
