'use strict';

const fs = require('fs');

const TEMPLATE_DIR = `${__dirname}/../templates`;

module.exports = function templateLoad(template) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${TEMPLATE_DIR}/${template}/index.html`, 'utf-8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};
