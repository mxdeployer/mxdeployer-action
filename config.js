import * as core from "@actions/core";

class Config {
    constructor() {
        this.archivePath = `build-${new Date().valueOf().toString(16)}.zip`;
        this.azServiceBusConnectionString = core.getInput('az-service-bus-connection-string');
        this.azStorageConnectionString = core.getInput('az-storage-connection-string');
        this.sourcePath = core.getInput('source-path');
        this.host = core.getInput('host');
        this.appName = core.getInput('app-name');
        this.environment = core.getInput('environment');
        this.appSecrets = core.getInput('app-secrets');
    }
}

export default new Config();
