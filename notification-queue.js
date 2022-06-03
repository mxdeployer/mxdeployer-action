export default class NotificationQueue {
 
    constructor(connectionString) {
        this.connectionString = connectionString;
    }

    async send(notification) {
        console.debug(JSON.stringify(notification));
    }
}