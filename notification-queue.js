export default class NotificationQueue {
 
    constructor(connectionString) {
        this.connectionString = connectionString;
    }

    async send(notification) {
        console.debug(`Sending notification for "${notification.appName}" to "${notification.host}" ...`)
        console.debug(JSON.stringify(notification));
    }
}