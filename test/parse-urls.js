/* global describe, it */

const assert = require('chai').assert;
const parseUrls = require('../lib/helpers/parse-urls');

describe('parse urls helper', () => {
  it('should create an array of urls', () => {
    const parsed = parseUrls('http://www.site1.com/,http://www.site2.com/index.html', 2);
    const expected = ['http://www.site1.com/', 'http://www.site2.com/index.html'];
    assert.deepEqual(parsed, expected);
  });

  it('should throw an error when a protocol is not set (e.g. http)', () => {
    assert.throws(() => {
      parseUrls('www.site1.com/,http://www.site2.com/index.html', 2);
    }, Error);

    assert.throws(() => {
      parseUrls('www.site1.com/,http://www.site2.com/index.html', 2);
    }, /misses a protocol/);
  });

  it('should throw an error when more urls than slides are given', () => {
    assert.throws(() => {
      parseUrls('http://www.site1.com/,http://www.site2.com/index.html', 1);
    }, Error);
  });

  it('should create an array of urls that equals the length of slides', () => {
    const parsedWithOneUrl = parseUrls('http://www.site1.com/', 3);
    const parsedWithTwoUrls = parseUrls('http://www.site1.com/,http://www.site2.com/', 3);

    const expected = ['http://www.site1.com/', 'http://www.site1.com/', 'http://www.site1.com/'];

    assert.isArray(parsedWithOneUrl);
    assert.isArray(parsedWithTwoUrls);

    assert.lengthOf(parsedWithOneUrl, 3);
    assert.lengthOf(parsedWithTwoUrls, 3);

    assert.deepEqual(parsedWithOneUrl, expected);
    assert.deepEqual(parsedWithTwoUrls, expected);
  });
});
