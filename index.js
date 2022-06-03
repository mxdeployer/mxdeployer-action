import * as core from "@actions/core";
import * as github from '@actions/github';
import * as fs from 'fs';
import * as archiver from 'archiver';
import * as crypto from 'crypto';

try {

  const archivePath = `build-${crypto.randomBytes(8).toString('hex')}.zip`;
  const azServiceBusConnectionString = core.getInput('az-service-bus-connection-string');
  const azStorageConnectionString = core.getInput('az-storage-connection-string');
  const sourcePath = core.getInput('source-path');
  const host = core.getInput('host');
  const appName = core.getInput('app-name');
  const environment = core.getInput('environment');
  const appSecrets = core.getInput('app-secrets');

  console.log(`archive-path: ${archivePath}`);
  console.log(`az-service-bus-connection-string: ${azServiceBusConnectionString}`);
  console.log(`az-storage-connection-string: ${azStorageConnectionString}`);
  console.log(`source-path: ${sourcePath}`);
  console.log(`host: ${host}`);
  console.log(`app-name: ${appName}`);
  console.log(`environment: ${environment}`);
  console.log(`app-secrets: ${appSecrets}`);

/*  
  const output = fs.createWriteStream(archivePath);
  const archive = archiver('zip');

  archive.on('error', err => {
    throw err;
  });  

  archive.pipe(output);
  archive.directory(sourcePath, false);
  archive.finalize();
*/

  core.setOutput('archive-path', archivePath);

} catch (error) {
  core.setFailed(error.message);
}
