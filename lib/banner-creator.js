'use strict';

const bannerCreator = require('./index');
const parseFiles = require('./helpers/parse-files');
const parseUrls = require('./helpers/parse-urls');

module.exports = (cmd) => {
  if (!cmd.size || !cmd.files || !cmd.urls) {
    throw new Error('One or more of the required options are not set');
  }

  const options = cmd;

  options.files = parseFiles(options.files);
  options.urls = parseUrls(options.urls, options.files.length);
  options.format = cmd.size;
  options.outputName = cmd.output;

  bannerCreator(options);
};
