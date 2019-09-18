/**
* ======================================================================
* Copyright (C) 2018-2019  Yobny Technology Solutions
* This file is part of QueueOne project.
* ======================================================================
*/
const Queue = require('./Queue.js')

/**
 * Entity faciliates the queue interaction APIs which helps to retreive, 
 * change status, make booking, add user to the queue, etc. functionalities
 */
class Queues {

    /**
     * Initialize the the Queues entity to operate the account 
     * related queue interface. 
     * 
     * @param {QueueOneClient} client instance
     */
    constructor(client) {
        this.client = client
    }

    /**
     * Retrieves the Queue based on the unique identifier 
     * 
     * @param {string} key unqiue queue identifier
     * @returns {Promise<Queue>} Promise that resolves to a Queue object
     */
    retrieve(key) {
        return this.client.get('queues/${key}')
            .then((res) => new Queue(res.data))
    }

    /**
     * Retrieves the Queues details associated to the account
     * 
     *  @returns {[Queues]} List of Queues associated with the account
     */
    retrieve_all() {
        this.client.get('queues/')
            .then((res) => {
                let queues = res.items.map((queueData) => new Queue(queueData))
                return queues
            })
    }

    /**
     * Update the queue status
     * 
     * @param {*} status string one off 'active', 'inactive', 'hidden', 'full', 
     *                  'suspended', 'inprogress', 'break', 'unknown', 'insuggestion'
     * @param {*} key unique queue identifier 
     * @param {*} notes action related notes
     * @returns {Promise} Promise execution of the execution action
     */
    change_status(status, key, notes='') {
        return this.client.post(baseUrl + '/queues/change-status', {
            'queue_id' : key,
            'notes' : notes,
            'queue_status' : status
         })
    }


}

module.exports = Queues