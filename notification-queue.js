import * as azsb from "@azure/service-bus";

export default class NotificationQueue {
 
    constructor(connectionString) {
        this.connectionString = connectionString;
    }

    async send(notification) {

        console.info(`Sending notification for "${notification.appName}" to "${notification.host}" ...`)

        const client = new azsb.ServiceBusClient(this.connectionString);
        const sender = client.createSender("sbt-mxdeployer");

        await sender.sendMessages({ body: JSON.stringify(notification), contentType: "application/json" });

        console.info("OK.");
    }
}