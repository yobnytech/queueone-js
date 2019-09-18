/**
* ======================================================================
* Copyright (C) 2018-2019  Yobny Technology Solutions
* This file is part of QueueOne project.
* ======================================================================
*/
const Account  = require('./Account.js')

const baseUrl = '/accounts/me'

/**
 * Entity faciliates the API and functions to validate and retreive the 
 * account details from the QueueOne backend. 
 */
class Accounts{
    
    /**
     * @param {*} client Backend Connection client instance. 
     */
    constructor (client) {
        this.client = client
    }

    /**
     * reterives the account details based on the provided details
     * @returns {Promise<Account>} Promise instance which resolved to the 
     * Account object which retrived from the backend. 
     * 
     */
    retrieveMyAccount () {
        return this.client.get(baseUrl).then((res) => new Account(res.data))
    }

    /**
     * regenerates the secret key
     * @returns {Promise<string>} secretKey regenerated secret key
     */
    regenerateSecretKey () {
        return this.client.post(baseUrl + '/secret-key/actions/regenerate').then((res) => res.data.secretKey)
    }

    /**
     * Changes the account password 
     * 
     * @param {string} password
     * @returns {Promise} Promise
     */
    changePassword (password) {
        return this.client.post(baseUrl + '/actions/change-password', { 
            'password' :  password })
    }

}

module.exports = Accounts