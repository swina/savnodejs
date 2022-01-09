const { Service } = require('feathers-knex');

exports.Status = class Status extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'tbl_status'
    });
  }
};
