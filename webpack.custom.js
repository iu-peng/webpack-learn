const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve("./custom"),
    filename: "main.js",
  },
  mode: "development",
};
