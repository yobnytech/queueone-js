/**
* ======================================================================
* Copyright (C) 2018-2019  Yobny Technology Solutions
* This file is part of QueueOne project.
* ======================================================================
*/
const Accounts = require('./Accounts/Accounts.js')
const errorResponseHandler = require('./errorInterceptor.js')
const Axios = require('axios')

/**
 * QueueOne Client instance to execute the queue functionlaities in the 
 * backend. 
 */
class QueueOneClient {

    /**
     * QueueOne API Client Interface constructor which takes secretKey and 
     * BaseUrl crates the Axios client to interact with the QueueOne 
     * backend for different functionalties. 
     * 
     * @param {*} secretKey Connection authroization secret key 
     * @param {*} baseUrl  Connection based URL
     */
    constructor(secretKey, baseUrl = 'https://api.queueone.in/qone/v1/') {

        // create Axios client with provided SecretKey and with no password, these 
        // details will be validated in the backend to authoize the execution.
        this.client = Axios.create({
            baseURL: baseUrl,
            auth: {
                username: secretKey,
                password: null
            },
            errorHandle: false
        })

        // setup the request listener in the client
        this._setupRequestListener()

        // setup the error interceptor for the backend execution
        this.errInterceptor = this.client.interceptors.response.use(
            response => response, errorResponseHandler
        )

        // register the accounts object with the QueueOne client 
        // instance which helps to navigate the account details.
        this.accounts = new Accounts(this.client)

    }

    /**
     * Helper function to set the request listener to listener object expected
     * to listen for the onRequestStarted() and onRequestEnded() function which 
     * will be executed when the response or request executed from the backend.
     * 
     * @param {*} requestListener 
     */
    setRequestListener(requestListener) {
        this.requestListener = requestListener
    }


    /**
     * Internal function to setup the interceptors in the Axios client and provide 
     * callback to the listener when the request started and request endeded to 
     * asynchronous functionalties.
     */
    _setupRequestListener() {
        // add request listener when the execution starts in the 
        // axios client and invoke the callback
        this.client.interceptors.request.use(config => {
            if (this.requestListener) {
                config.listener = this.requestListener()
                config.listener.onRequestStarted()
            }
            return config
        })

        // on response check the hooked interceptors and invoke the request ended 
        // callback. if the callback provides response ignore the promise. 
        this.client.interceptors.response.use(
            response => {
                if (response.config.listener) {
                    response.config.listener.onRequestEnded()
                }
                return response
            },
            response => {
                if (response.config.listener) {
                    response.config.listener.onRequestEnded()
                }
                return Promise.reject(response)
            }
        )
    }

}

module.exports = QueueOneClient