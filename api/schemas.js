// const path = require("path");
// const fs = require("fs");

// module.exports = (_, res) => {
//   // let schemas = [];
//   const directoryPath = path.join(__dirname, "schemas");
//   return res.status(200).send(directoryPath);
//   // fs.readdir(directoryPath, function (err, files) {
//   //   if (err) {
//   //     return console.log("Unable to scan directory: " + err);
//   //   }
//   //   files.forEach(function (file) {
//   //     schemas.push(file);
//   //   });
//   //   return res.status(200).send(schemas);
//   // });
// };

const fetch = require("node-fetch");

let schemas = [];

fetch("https://cdn.murmurations.tech/schemas")
  .then((res) => res.text())
  .then((body) => {
    const files = [...body.matchAll(/(?<=file json">)(.*)(?=<\/a>)/g)];

    files.forEach((file) => {
      schemas.push(file[0]);
    });

    console.log(JSON.stringify(schemas, null, 2));
  });
