import * as core from "@actions/core";
import * as fs from 'fs';
import archiver from 'archiver';
import config from './config.js';
import DeploymentNotification from "./deployment-notification.js";
import NotificationQueue from "./notification-queue.js";
import ArtifactStore from "./artifact-store.js";

(async () => {

  try {

    const output = fs.createWriteStream(config.archivePath);
    const archive = archiver('zip');
  
    archive.on('error', err => {
      throw err;
    });  
  
    archive.pipe(output);
    archive.directory(config.sourcePath, false);
    archive.finalize();
  
    var store = new ArtifactStore(config.azStorageConnectionString);
    var queue = new NotificationQueue(config.azServiceBusConnectionString);
  
    await store.upload(config.archivePath);
    await queue.send(new DeploymentNotification("", config.host, config.appName, config.environment, config.appSecrets));
  
    core.setOutput('archive-path', config.archivePath);
  
  } catch (error) {
    core.setFailed(error.message);
  }

})();


