const { Service } = require('feathers-knex');

exports.Agenda = class Agenda extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'tbl_status'
    });
  }
};
