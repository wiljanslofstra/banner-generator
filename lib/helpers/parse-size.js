/**
 * Parse sizes string (e.g. 728x90)
 * @param  {String} size String that defines the width and height of the banner (e.g. 728x90)
 * @return {Array}       Array containing the width and height
 */
module.exports = function parseSize(size) {
  if (size.indexOf('x') < 0) {
    throw new Error('The sizes option should formatted like \'728x90\'');
  }

  const split = size.split('x');

  return split.map((dimension) => parseInt(dimension, 10));
};
