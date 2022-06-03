export default class DeploymentNotification {
    constructor(url,host,appName,environment,appSecrets) {
        this.url = url;
        this.host = host;
        this.appName = appName;
        this.environment = JSON.parse(environment || "{}");
        this.appSecrets = JSON.parse(appSecrets || "{}");
    }
}
