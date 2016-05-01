/* global describe, it, before */
'use strict';

const assert = require('chai').assert;
const templateParser = require('../lib/template-parse');

let validTransformed;

describe('template parser', () => {
  before(() => {
    validTransformed = templateParser.transformData({
      urls: ['http://www.site1.nl/', 'http://www.site2.nl/index.html'],
      files: ['file1.png', 'file2.jpg'],
    });
  });

  it('should concatenate url string together seperated by a comma', () => {
    assert.equal(validTransformed.urls, 'http://www.site1.nl/,http://www.site2.nl/index.html');
  });

  it('should concatenate file strings together seperated by a comma', () => {
    assert.equal(validTransformed.files, 'file1.png,file2.jpg');
  });

  it('should compile html to Dust.js', (done) => {
    // Pre-compile template
    templateParser.compile('<div>Hello world</div>');

    // Render compiled template
    templateParser.renderCompiled(validTransformed, (err, data) => {
      assert.equal(data, '<div>Hello world</div>');
      assert.isNull(err, 'error is not set');
      done();
    });
  });

  it('should compile html with given data to Dust.js', (done) => {
    // Pre-compile template
    templateParser.compile('<div>{text}</div>');

    const templateData = {
      text: 'Hello world!',
    };

    // Render compiled template
    templateParser.renderCompiled(templateData, (err, data) => {
      assert.equal(data, '<div>Hello world!</div>');
      assert.isNull(err, 'error is not set');
      done();
    });
  });
});
