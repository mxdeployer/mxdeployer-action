const core = require('@actions/core');
const github = require('@actions/github');

try {

  const host = core.getInput("dest-host")
  console.log(`Host: ${host}`);

  const egassem = core.getInput("message").split("").reverse().join("")
  console.log(`Message: ${egassem}`);

} catch (error) {
  core.setFailed(error.message);
}

