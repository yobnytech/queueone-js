/**
* ======================================================================
* Copyright (C) 2018-2019  Yobny Technology Solutions
* This file is part of QueueOne project.
* ======================================================================
*/

/**
 * Entity holds the basic Queue Details to construct the information page
 * about the queue. 
 */
class Queue {

    /**
     * Initialize the Queue entitiy with provided queue details 
     * 
     * @param {*} queue 
     */
    constructor (queue) {
        // unique queue identifier
        this.queue_id = queue.id
        // name of the queue 
        this.name = queue.title
        // queue business purpose
        this.purpose = queue.queue_business_purpose
        // queue current population
        this.current_population = queue.depth
        // current average wait time
        this.current_avg_queue_wait_time = queue.avg_time
        // current queue status
        this.status = queue.queue_status
        // is the bookable queue
        this.bookable = queue.bookable
        // is the authenticated user is staff for the queue
        this.is_staff = queue.is_staff
        // is the authenticated user is manager for the queue
        this.is_manager = queue.is_manager
        // athenticated user is allocated to which service counter
        this.allocated_to = queue.allocated_to
        // open alert message in the queue 
        this.queue_alert_messages = queue.queue_alert_messages
        // is any IOT devices attached to the queue
        this.has_devices = queue.has_devices
    }

}

module.exports = Queue;