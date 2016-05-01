/**
 * Splits comma seperated file list into an array
 * @param  {String} files List of files seperated by commas
 * @return {Array}        Array of files
 */
module.exports = function parseFiles(files) {
  return files.split(',');
};
