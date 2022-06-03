export default class DeploymentNotification {

    constructor(url, ref, host, appName, environment, appSecrets) {

        this.url = url;
        this.ref = ref;
        this.host = host;
        this.appName = appName;
        this.environment = JSON.parse(environment || "{}");
        this.appSecrets = JSON.parse(appSecrets || "{}");
    }
}
