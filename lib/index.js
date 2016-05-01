const parseSize = require('./helpers/parse-size');

const loader = require('./template-load');
const parser = require('./template-parse');
const writer = require('./template-write');

module.exports = function bannerCreator(options) {
  const data = Object.create(options);

  data.format = parseSize(options.format);
  data.template = data.template || 'swipe-gallery';
  data.outputName = data.outputName || 'banners';

  loader.templateLoad(data.template)
    // Parse html with data
    .then((html) => parser.parse(html, data))

    // Write template to temporary directory
    .then(writer.template)

    // Write files (images) to temporary directory
    .then(() => writer.files(data.files))

    // Zip temporary directory
    .then(() => writer.zip(data.outputName))

    .then(() => {
      if (typeof data.onComplete !== 'undefined') {
        data.onComplete();
      }
    })

    // Catch errors thrown in the process
    .catch((err) => {
      throw new Error(err);
    });
};
