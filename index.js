import * as core from "@actions/core";
import * as github from '@actions/github'
import * as fs from 'fs';
import archiver from 'archiver';
import config from './config.js';
import DeploymentNotification from "./deployment-notification.js";
import NotificationQueue from "./notification-queue.js";
import ArtifactStore from "./artifact-store.js";

(async () => {

  try {
    
    let tag = null;
    const ref = github.context.ref;

    console.debug(`🔖 ref: ${ref}`);

    if (ref && ref.startsWith("refs/tags/"))
      tag = ref.replace(/^refs\/tags\//, "");

    const output = fs.createWriteStream(config.archivePath);
    const archive = archiver('zip');
  
    archive.on('error', err => {
      throw err;
    });  
  
    archive.pipe(output);
    archive.directory(config.sourcePath, false);
    await archive.finalize();
  
    const store = new ArtifactStore(config.azStorageConnectionString);
    const queue = new NotificationQueue(config.azServiceBusConnectionString);
  
    const url = await store.upload(config.archivePath);
    await queue.send(new DeploymentNotification(url, tag, config.host, config.appName, config.environment, config.appSecrets));
  
    core.setOutput('archive-path', config.archivePath);
  
  } catch (error) {
    core.setFailed(error.message);
  }

})();


