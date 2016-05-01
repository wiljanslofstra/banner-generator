'use strict';

const fsp = require('fs-promise');
const Zip = require('node-zip');
const zip = new Zip();

const TEMP_DIR = `${__dirname}/../.temp`;
const TEMP_TEMPLATE = `${TEMP_DIR}/index.html`;
const OUTPUT_DIR = process.cwd();

/**
 * Write template to temporary directory
 * @param  {String} html HTML string to write
 * @return {Promise}
 */
function writeTemplate(html) {
  return new Promise((resolve, reject) => {
    fsp.writeFile(`${TEMP_DIR}/index.html`, html)
      .then(resolve)
      .catch(reject);
  });
}

function writeFile(filePath, data) {
  // Remove path
  let fileName = filePath.split('/');
  fileName = fileName[fileName.length - 1];

  return new Promise((resolve, reject) =>
    fsp.open(`${TEMP_DIR}/${fileName}`, 'a')
      .then((fd) => {
        fsp.write(fd, data, 0, data.length, null)
          .then(() => {
            resolve();
          })
          .catch(reject);
      })
      .catch(reject)
  );
}

function readWriteFile(file) {
  return new Promise((resolve, reject) => {
    fsp.readFile(file)
      .then((data) => {
        const filePath = `${TEMP_DIR}/${file}`;
        writeFile(filePath, data).then(resolve);
      })
      .catch(reject);
  });
}

module.exports = {
  /**
   * Write template to file
   * @param  {String} html HTML string to write
   * @return {Promise}
   */
  template(html) {
    return new Promise((resolve, reject) => {
      // First ensure the template exists and then write the template to it
      fsp.ensureFile(TEMP_TEMPLATE)
        .then(() => {
          writeTemplate(html)
            .then(resolve)
            .catch(reject);
        });
    });
  },

  files(files) {
    return new Promise((resolve, reject) =>
      Promise.all(
        files.map(file => readWriteFile(file))
      )
        .then(resolve)
        .catch(reject)
    );
  },

  zip(outputName) {
    return new Promise((resolve) =>
      fsp.readdir(TEMP_DIR)
        .then((files) => {
          files.forEach(file => {
            zip.file(file, fsp.readFileSync(`${TEMP_DIR}/${file}`));
          });

          const data = zip.generate({
            base64: false,
            compression: 'DEFLATE',
          });

          fsp.writeFileSync(`${OUTPUT_DIR}/${outputName}.zip`, data, 'binary');

          // Remove temporary directory
          fsp.remove(TEMP_DIR);

          resolve();
        })
    );
  },
};
