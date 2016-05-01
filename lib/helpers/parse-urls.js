'use strict';

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
 * Check if url string has a protocol attached
 * @param  {String} url Url to check
 * @return {Boolean}    Either it has a protocol or it hasn't
 */
function urlHasProtocol(url) {
  return (url.indexOf('http') >= 0);
}

/**
 * Parses a comma seperated list of urls, also checking validity and synchronising the urls array
 * length with the length of the gallery
 * @param  {String}  urlString      String of urls seperated by commas
 * @param  {Integer} fileListLength Length of the gallery
 * @return {Array}                  Array containing exit urls for every slide in the gallery
 */
module.exports = function parseUrls(urlString, fileListLength) {
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
