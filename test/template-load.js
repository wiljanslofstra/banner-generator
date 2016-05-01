/* global describe, it */

const assert = require('chai').assert;
const templateLoader = require('../lib/template-load');

describe('template loader', () => {
  it('should return the correct template path', () => {
    const templatePath = templateLoader.getTemplatePath('swipe-gallery', 'dir');
    assert.equal(templatePath, 'dir/swipe-gallery/index.html');
  });

  it('should create an error if a template cant be found', (done) => {
    templateLoader.getTemplateFromSystem('non-existent-template', (err) => {
      assert.include(err.code, 'ENOENT');
      done();
    });
  });

  it('should return an existing template', (done) => {
    templateLoader.getTemplateFromSystem('swipe-gallery', (err, data) => {
      assert.isDefined(data, 'swipe gallery template is defined');
      assert.isString(data, 'swipe gallery response is a string (html)');
      assert.isNull(err, 'there was no error');
      done();
    });
  });
});
