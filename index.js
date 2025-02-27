const core = require("@actions/core");
const github = require("@actions/github");
const path = require("path");
const fs = require("fs");

const onePath = path.root + "one.json";
const twoPath = "two.json";
const threePath = "three.json";

function getNum(filepath) {
  const file = fs.readFileSync(filepath, "utf-8");
  const number = JSON.parse(file)?.number;
  return number;
}

try {
  const oneNum = getNum(onePath);
  const twoNum = getNum(twoPath);
  const threeNum = getNum(threePath);
  if ((oneNum == twoNum) == threeNum) {
    core.setOutput("match", "wow great job!");
    core.setOutput("one", oneNum);
    core.setOutput("two", twoNum);
    core.setOutput("three", threeNum);
  } else {
    const errorString = `no match! \none: ${oneNum}\ntwo: ${twoNum}\nthree: ${threeNum}`;
    throw new Error(errorString);
  }
} catch (error) {
  core.setFailed(error.message);
}
