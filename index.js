const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");

const onePath = "./one.js";
const twoPath = "./two.json";
const threePath = "./three.json";

function getNum(path) {
  const file = fs.readFileSync(path, "utf-8");
  const number = JSON.parse(file)?.number;
  return number;
}

try {
  // `who-to-greet` input defined in action metadata file
  const oneNum = getNum(onePath);
  const twoNum = getNum(twoPath);
  const threeNum = getNum(threePath);
  core.setOutput("match", "wow ");
  if ((oneNum == twoNum) == threeNum) {
    core.setOutput("match", "wow great job!");
  } else {
    throw new Error("no match!");
  }
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
