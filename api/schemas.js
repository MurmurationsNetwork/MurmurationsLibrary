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

module.exports = (_, res) => {
  // fetch("https://cdn.murmurations.tech/schemas")
  fetch("https://murmurations-library-o623qns32.vercel.app/schemas")
    .then((res) => res.text())
    .then((body) => {
      const files = [...body.matchAll(/(?<=file json">)(.*)(?=<\/a>)/g)];

      files.forEach((file) => {
        if (schemas.includes(file[0])) return;
        schemas.push(file[0]);
      });
    });

  res.status(200);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(schemas, null, 2));
};
