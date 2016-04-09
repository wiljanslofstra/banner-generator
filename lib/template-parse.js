'use strict';

const dust = require('dustjs-linkedin');

function transformData(data) {
  const modified = Object.create(data);

  modified.urls = modified.urls.join(',');
  modified.files = modified.files.join(',');

  return modified;
}

/**
 * Render template using Dust
 * @param  {String} html HTML string to render
 * @param  {Object} data Data to render
 * @return {Promise}
 */
module.exports = function templateParse(html, data) {
  return new Promise((resolve, reject) => {
    // Disable white space removal, by not using this the html is not valid because
    // of Javascript comments in the source
    dust.optimizers.format = (ctx, node) => node;

    // Compile the template
    const compiled = dust.compile(html, 'template');

    // Load the compiled source into Dust
    dust.loadSource(compiled);

    // Transform data (primarily transforming arrays in strings)
    const transformed = transformData(data);

    // Render the template
    dust.render('template', transformed, (err, out) => {
      if (err) reject(err);
      resolve(out);
    });
  });
};
