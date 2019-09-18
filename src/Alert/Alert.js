/**
* ======================================================================
* Copyright (C) 2018-2019  Yobny Technology Solutions
* This file is part of QueueOne project.
* ======================================================================
*/

/**
 * Alert Entity holds the details about the alert details related to the 
 * Queue.
 */
class Alert {

    /**
     * initialize the alert entity with the retrived data 
     * 
     * @param {*} alertdata retrived alert data 
     */
    constructor(alertdata) {
        this.message = alertdata.message
        this.id = alertdata.id
        this.status = alertdata.status
        this.date_created = alertdata.date_created
    }
}