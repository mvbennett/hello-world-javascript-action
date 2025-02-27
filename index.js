const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");

const onePath = "./one.json";
const twoPath = "./two.json";
const threePath = "./three.json";

function getNum(path) {
  const file = fs.readFileSync(path, "utf-8");
  const number = JSON.parse(file)?.number;
  return number;
}

try {
  const oneNum = getNum(onePath);
  const twoNum = getNum(twoPath);
  const threeNum = getNum(threePath);
  if ((oneNum == twoNum) == threeNum) {
    core.setOutput("match", "wow great job!");
  } else {
    throw new Error("no match!");
  }
  // // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2);
  // console.log(`The event payload: ${payload}`);
  // const one = true;
  // const two = true;
  // if (one != two) {
  //   throw new Error("no match!");
  // }
  // core.setOutput("match", "wow great job");
} catch (error) {
  core.setFailed(error.message);
}
