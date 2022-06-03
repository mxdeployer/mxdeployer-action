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
  
    const store = new ArtifactStore(config.azStorageConnectionString);
    const queue = new NotificationQueue(config.azServiceBusConnectionString);
  
    console.debug("✅ CHECKPOINT 1");
    const url = await store.upload(config.archivePath);
    console.debug("✅ CHECKPOINT 2");
    await queue.send(new DeploymentNotification(url, config.host, config.appName, config.environment, config.appSecrets));
    console.debug("✅ CHECKPOINT 3");
  
    core.setOutput('archive-path', config.archivePath);
  
  } catch (error) {
    core.setFailed(error.message);
  }

})();


