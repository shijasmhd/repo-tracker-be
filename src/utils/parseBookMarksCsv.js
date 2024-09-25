const fs = require("fs");
const parse = require("csv-parser");

const parseBookMarksCsv = (filePath) => {
  return new Promise((resolve, reject) => {
    const urls = [];
    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (row) => {
        urls.push(row.repo_url);
      })
      .on("end", () => {
        resolve(urls);
        fs.unlinkSync(filePath);
      })
      .on("error", (error) => {
        reject(error);
        fs.unlinkSync(filePath);
      });
  });
};

module.exports = parseBookMarksCsv;
