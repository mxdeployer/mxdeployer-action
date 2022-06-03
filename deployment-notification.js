export default class DeploymentNotification {

    constructor(url, tag, host, appName, environment, appSecrets) {

        this.url = url;
        this.tag = tag;
        this.host = host;
        this.appName = appName;
        this.environment = JSON.parse(environment || "{}");
        this.appSecrets = JSON.parse(appSecrets || "{}");
    }
}
