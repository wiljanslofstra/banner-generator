'use strict';

const dust = require('dustjs-linkedin');

module.exports = {
  /**
   * Render template using Dust
   * @param  {String} html HTML string to render
   * @param  {Object} data Data to render
   * @return {Promise}
   */
  parse: function parse(html, data) {
    return new Promise((resolve, reject) => {
      this.compile(html);

      // Transform data (primarily transforming arrays in strings)
      const transformed = this.transformData(data);

      this.renderCompiled(transformed, (err, out) => {
        if (err) {
          reject(err);
        } else {
          resolve(out);
        }
      });
    });
  },

  renderCompiled: function renderCompiled(data, cb) {
    // Render the template
    dust.render('template', data, (err, out) => {
      if (err) {
        return cb(err);
      }
      return cb(null, out);
    });
  },

  compile: function compile(html) {
    // Disable white space removal, by not using this the html is not valid because
    // of Javascript comments in the source
    dust.optimizers.format = (ctx, node) => node;

    // Compile the template
    const compiled = dust.compile(html, 'template');

    // Load the compiled source into Dust
    dust.loadSource(compiled);

    return compiled;
  },

  transformData: function transformData(data) {
    const modified = Object.create(data);

    modified.urls = modified.urls.join(',');
    modified.files = modified.files.join(',');

    return modified;
  },
};
