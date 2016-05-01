/* global describe, it */

const assert = require('chai').assert;
const parseFiles = require('../lib/helpers/parse-files');

describe('parse files', () => {
  it('should create an array of files', () => {
    const parsedWithOneFile = parseFiles('file1.jpg');
    const parsedWithTwoFiles = parseFiles('file1.jpg,file2.jpg');

    assert.isArray(parsedWithTwoFiles);
    assert.deepEqual(parsedWithTwoFiles, ['file1.jpg', 'file2.jpg']);

    assert.isArray(parsedWithOneFile);
    assert.deepEqual(parsedWithOneFile, ['file1.jpg']);
  });
});
