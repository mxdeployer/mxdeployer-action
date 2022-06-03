import * as core from "@actions/core";
import * as crypto from 'crypto';

class Config {
    constructor() {
        this.archivePath = `build-${crypto.randomBytes(8).toString('hex')}.zip`;
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
