const fs = require("fs");

/**
 * Считывает файл
 * @param {string} filepath
 * @return {Promise<string>} fileContent
 */
module.exports = function readFile(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, content) => {
      if (err) return reject(err);
      return resolve(content);
    });
  });
};
