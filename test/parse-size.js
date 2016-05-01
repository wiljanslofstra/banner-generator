/* global describe, it */

const assert = require('chai').assert;
const parseSize = require('../lib/helpers/parse-size');

describe('parse size', () => {
  it('should properly parse widthxheight in an array with width and height seperated', () => {
    const parsed = parseSize('728x90');
    assert.deepEqual(parsed, [728, 90]);
  });

  it('should throw an error when width and height are not properly given', () => {
    assert.throws(() => {
      parseSize('728/90');
    }, Error);

    assert.throws(() => {
      parseSize('72890');
    }, Error);
  });
});
