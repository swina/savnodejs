const { Service } = require('feathers-knex');

exports.Processi = class Processi extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'tbl_processi'
    });
  }
};
