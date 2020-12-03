const path = require("path");
const fs = require("fs");

module.exports = (_, res) => {
  let schemas = [];
  const directoryPath = path.join(__dirname, "schemas");

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    files.forEach(function (file) {
      schemas.push(file);
    });
    return res.status(200).send(schemas);
  });
};
