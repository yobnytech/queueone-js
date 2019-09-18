/**
* ======================================================================
* Copyright (C) 2018-2019  Yobny Technology Solutions
* This file is part of AlertOne project.
* ======================================================================
*/
const Alert = require('./Alert.js')

/**
 * Entity faciliates the Alert interaction APIs which helps to retreive, 
 * and update the queue alerts 
 */
class Alerts {

    /**
     * Initialize the the Alerts entity to operate the account 
     * related Queue Alert interface. 
     * 
     * @param {QueueOneClient} client instance
     */
    constructor(client) {
        this.client = client
    }

    /**
     * Retrieves the Open Alerts based on the unique queue identifier 
     * 
     * @param {string} key unqiue queue identifier
     * @returns {[Alerts]} List of open alerts associated with the queue
     */
    open_alerts(key) {
        return this.client.get('queue/alerts/${key}')
            .then((res) => {
                let alerts = res.items.map((alertData) => new Alert(alertData))
                return alerts
            })
    }

    mark_alert_read(key) {
        return this.client.post('/queue/alerts/read/', { 
            'alert_id' :  key })
    }
    
}

module.exports = Alerts