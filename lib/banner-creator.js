'use strict';

const loader = require('./template-load');
const parser = require('./template-parse');
const writer = require('./template-write');

/**
 * Splits comma seperated file list into an array
 * @param  {String} files List of files seperated by commas
 * @return {Array}        Array of files
 */
function parseFiles(files) {
  return files.split(',');
}

/**
 * Parse sizes string (e.g. 728x90)
 * @param  {String} size String that defines the width and height of the banner (e.g. 728x90)
 * @return {Array}       Array containing the width and height
 */
function parseSize(size) {
  if (size.indexOf('x') < 0) {
    throw new Error('The sizes option should formatted like \'728x90\'');
  }

  return size.split('x');
}

/**
 * Check if url string has a protocol attached
 * @param  {String} url Url to check
 * @return {Boolean}    Either it has a protocol or it hasn't
 */
function urlHasProtocol(url) {
  return (url.indexOf('http') >= 0);
}

/**
 * Creates a fixed length array where each item is val
 * @param  {Integer} l   Length of the array
 * @param  {String}  val Value that should fill the array
 * @return {Arrray}      Array with length 'l' and each item being 'val'
 */
function createFixedLengthArray(l, val) {
  return Array.apply(null, Array(l)).map(() => val);
}

/**
 * Parses a comma seperated list of urls, also checking validity and synchronising the urls array
 * length with the length of the gallery
 * @param  {String}  urlString      String of urls seperated by commas
 * @param  {Integer} fileListLength Length of the gallery
 * @return {Array}                  Array containing exit urls for every slide in the gallery
 */
function parseUrls(urlString, fileListLength) {
  const urls = urlString.split(',');

  // Check if there are no more urls than gallery items
  if (urls.length > fileListLength) {
    throw new Error('More urls defined than available slides');
  }

  // Check for the validity of the urls
  for (let i = 0, l = urls.length; i < l; i++) {
    if (!urlHasProtocol(urls[i])) {
      throw new Error(`
        The url ${urls[i]} misses a protocol (http or https). Please use absolute urls e.g. https://www.google.nl/
      `);
    }
  }

  // If the're less urls than slides, we give every slide the same exit url
  if (urls.length !== fileListLength) {
    return createFixedLengthArray(fileListLength, urls[0]);
  }

  return urls;
}

module.exports = (cmd) => {
  if (!cmd.size || !cmd.files || !cmd.urls) {
    throw new Error('One or more of the required options are not set');
  }

  const fileList = parseFiles(cmd.files);

  const data = {
    format: parseSize(cmd.size),
    files: fileList,
    urls: parseUrls(cmd.urls, fileList.length),
  };

  loader('swipe-gallery')
    // Parse html with data
    .then((html) => parser(html, data))

    // Write template to temporary directory
    .then(writer.template)

    // Write files (images) to temporary directory
    .then(() => writer.files(data.files))

    // Zip temporary directory
    .then(writer.zip)

    // Catch errors thrown in the process
    .catch((err) => {
      throw new Error(err);
    });
};
