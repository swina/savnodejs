const { Service } = require('feathers-knex');

exports.Clienti = class Clienti extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'tbl_clienti'
    });
  }
};
