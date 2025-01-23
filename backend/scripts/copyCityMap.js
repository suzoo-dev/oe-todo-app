const fs = require("fs");
const path = require("path");

const srcPath = path.join(__dirname, "..", "src", "data", "cityMap.json");
const destPath = path.join(
  __dirname,
  "..",
  "dist",
  "src",
  "data",
  "cityMap.json"
);

fs.mkdirSync(path.dirname(destPath), { recursive: true });
fs.copyFileSync(srcPath, destPath);

console.log("cityMap.json copied to dist folder");
