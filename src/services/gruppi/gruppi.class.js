const { Service } = require('feathers-knex');

exports.Gruppi = class Gruppi extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'tbl_gruppi'
    });
  }
};
