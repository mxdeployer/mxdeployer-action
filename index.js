const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const archiver = require('archiver');
const crypto = require('crypto');

try {

  const archivePath = `build-${crypto.randomBytes(8).toString('hex')}.zip`;
  console.log(`Archive path: ${archivePath}`);

  const sourcePath = core.getInput("source-path");
  console.log(`Source Path: ${sourcePath}`);

  const host = core.getInput("dest-host");
  console.log(`Host: ${host}`);

  const egassem = core.getInput("message").split("").reverse().join("")
  console.log(`Message: ${egassem}`);

  const output = fs.createWriteStream(archivePath);
  const archive = archiver('zip');

  archive.on('error', err => {
    throw err;
  });  

  archive.pipe(output);
  archive.directory(sourcePath, false);
  archive.finalize();

  core.setOutput('archive-path', archivePath);

} catch (error) {
  core.setFailed(error.message);
}
