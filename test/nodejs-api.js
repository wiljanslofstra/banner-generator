/* global describe, it */

const assert = require('chai').assert;
const bannerCreator = require('../lib/index');
const fs = require('fs');

function checkZipExists(path, cb) {
  fs.access(`${process.cwd()}/${path}`, fs.F_OK, (err) => {
    cb(err);
  });
}

function removeZip(path) {
  return fs.unlinkSync(`${process.cwd()}/${path}`);
}

describe('primary functionality', () => {
  it('should create a zip file', (done) => {
    bannerCreator({
      outputName: 'test',
      format: '300x250',
      files: ['test/assets/1.png', 'test/assets/2.png'],
      urls: ['http://www.site1.nl/', 'http://www.site2.nl/'],
      template: 'swipe-gallery',
      onComplete: () => {
        checkZipExists('test.zip', (err) => {
          // Clean up
          removeZip('test.zip');

          // Check if no errors are thrown
          assert.isNull(err);

          done();
        });
      },
    });
  });
});
