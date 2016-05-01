'use strict';

const fs = require('fs');

const TEMPLATE_DIR = `${__dirname}/../templates`;

module.exports = {
  getTemplatePath: function getTemplatePath(templateName, dir) {
    const templateDir = dir || TEMPLATE_DIR;
    return `${templateDir}/${templateName}/index.html`;
  },

  templateLoad: function templateLoad(template) {
    return new Promise((resolve) => {
      this.getTemplateFromSystem(template, (err, data) => {
        resolve(data);
      });
    });
  },

  getTemplateFromSystem: function getTemplateFromSystem(templateName, cb) {
    fs.readFile(this.getTemplatePath(templateName), 'utf-8', (err, data) => {
      if (err) {
        return cb(err);
      }
      return cb(null, data);
    });
  },
};
