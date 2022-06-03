import * as core from "@actions/core";
import * as fs from 'fs';
import archiver from 'archiver';

import config from './config.js';

try {

  console.debug(JSON.stringify(config));

  const output = fs.createWriteStream(config.archivePath);
  const archive = archiver('zip');

  archive.on('error', err => {
    throw err;
  });  

  archive.pipe(output);
  archive.directory(config.sourcePath, false);
  archive.finalize();

  core.setOutput('archive-path', config.archivePath);

} catch (error) {
  core.setFailed(error.message);
}
